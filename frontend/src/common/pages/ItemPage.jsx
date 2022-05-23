import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCommentsByItemId, getItemByIdUrl } from "../constants/apiUrls";
import {
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import {
  getCollectionPageRoute,
  getTagSearchRoute,
} from "../constants/appRoutes";
import CommentCreator from "../components/CommentCreator";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import useAuth from "../hooks/useAuth";
import { ADMIN, REGULAR } from "../constants/authStates";
import Comment from "../components/Comment";
import translate from "../utils/translate";

const ItemPage = () => {
  const { user } = useSelector(selectUser);
  const auth = useAuth();
  const { itemId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [comments, setComments] = useState([]);
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setIsFetching(true);
      const { data } = await axios.get(getItemByIdUrl(itemId));
      let rows = [{ name: translate("name"), value: data.name }];
      data.customFieldsValues.forEach(({ name, value }) => {
        rows.push({ name, value });
      });
      await fetchComments();
      setTableRows(rows);
      setItem(data);
      setIsFetching(false);
    };
    const fetchComments = async () => {
      const { data } = await axios.get(getCommentsByItemId(itemId));
      setComments(data);
    };
    fetchItem();

    const interval = setInterval(fetchComments, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isFetching) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <Box sx={{ m: 3 }}>
      <TableContainer component={Paper} sx={{ p: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>{translate("collection")}</Typography>
              </TableCell>
              <TableCell
                onClick={() =>
                  navigate(getCollectionPageRoute(item.collectionId["_id"]))
                }
              >
                <Typography textAlign="end">
                  {item.collectionId.name}
                </Typography>
              </TableCell>
            </TableRow>
            {tableRows.map(({ name, value }, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography>{name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography textAlign="end">{value}</Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{translate("tags")}</TableCell>
              <TableCell>
                <Box
                  display="flex"
                  alignItems="end"
                  justifyContent="end"
                  gap={1}
                  flexWrap="wrap"
                >
                  {item.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant="outlined"
                      onClick={() => {
                        navigate(getTagSearchRoute(tag));
                      }}
                    />
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" sx={{ mt: 4, mb: 3 }}>
        {translate("comments")} ({comments.length})
      </Typography>
      {(auth === REGULAR || auth === ADMIN) && (
        <Box sx={{ mb: 3 }}>
          <CommentCreator userId={!!user && user["_id"]} itemId={itemId} />
        </Box>
      )}

      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </Box>
  );
};

export default ItemPage;
