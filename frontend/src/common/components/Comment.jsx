import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Box } from "@mui/system";
import axios from "axios";
import { removeCommentVoteUrl, setCommentVoteUrl } from "../constants/apiUrls";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import useAuth from "../hooks/useAuth";
import { ADMIN, REGULAR } from "../constants/authStates";

const getInitialVoteState = (likes, user) => {
  if (user === null) {
    return "";
  }
  const userVote = likes.filter((like) => like.userId === user["_id"]);
  if (userVote.length === 0) {
    return "";
  }
  if (userVote[0].value === 1) {
    return "like";
  } else {
    return "unlike";
  }
};

const Comment = ({ author, text, createdAt, _id, likes }) => {
  const auth = useAuth();
  const { user } = useSelector(selectUser);
  const [voteState, setVoteState] = useState(getInitialVoteState(likes, user));
  const [voteResult, setVoteResult] = useState(
    likes.reduce((acc, obj) => {
      return acc + obj.value;
    }, 0)
  );
    const [showVotingError, setShowVotingError] = useState(false);


  const setUpVote = () => {
    if (auth === REGULAR || auth === ADMIN) {
      if (voteState === "like") {
        setVoteResult(voteResult - 1);
        setVoteState("");
        removeVoteApi();
      } else if (voteState === "unlike") {
        setVoteState("like");
        setVoteResult(voteResult + 2);
        setVoteApi(1);
      } else {
        setVoteState("like");
        setVoteResult(voteResult + 1);
        setVoteApi(1);
      }
    } else {
      setShowVotingError(true);
    }
  };

  const setDownVote = () => {
    if (auth === REGULAR || auth === ADMIN) {
      if (voteState === "unlike") {
        setVoteState("");
        setVoteResult(voteResult + 1);
        removeVoteApi();
      } else if (voteState === "like") {
        setVoteState("unlike");
        setVoteResult(voteResult - 2);
        setVoteApi(-1);
      } else {
        setVoteState("unlike");
        setVoteResult(voteResult - 1);
        setVoteApi(-1);
      }
    } else {
      setShowVotingError(true);
    }
  };

  const setVoteApi = async (value) => {
    if (user === null) {
      return;
    }
    await axios.post(setCommentVoteUrl(user["_id"], _id), { value });
  };

  const removeVoteApi = async () => {
    if (user === null) {
      return;
    }
    await axios.delete(removeCommentVoteUrl(user["_id"], _id));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h5" component="div">
              Author: {author.email}
            </Typography>
            <Typography variant="h6" style={{ wordWrap: "break-word" }}>
              {text}
            </Typography>
          </Grid>
          <Grid item>
            <Box
              flexDirection="row"
              display="flex"
              alignItems="center"
              justifyContent="end"
              gap={1}
            >
              <IconButton onClick={setDownVote}>
                <ThumbDownIcon
                  style={{ color: voteState === "unlike" ? "red" : "inherit" }}
                />
              </IconButton>
              <Typography>{voteResult}</Typography>
              <IconButton onClick={setUpVote}>
                <ThumbUpIcon
                  style={{ color: voteState === "like" ? "green" : "inherit" }}
                />
              </IconButton>
            </Box>
            {showVotingError && (
              <Typography color="red">
                Log in to like/dislike the comment
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Comment;
