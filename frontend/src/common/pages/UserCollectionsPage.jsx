import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { ADMIN, REGULAR } from "../constants/authStates";
import useAuth from "../hooks/useAuth";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useIsEditor from "../hooks/useIsEditor";
import CollectionCreator from "../components/CollectionCreator";
import axios from "axios";
import {
  getUserByEmailUrl,
  getCollectionsByUserIdUrl,
  deleteCollectionByIdUrl,
} from "../constants/apiUrls";
import CollectionPaper from "../components/CollectionPaper";
import translate from "../utils/translate";
import LoadingSpinner from "../components/LoadingSpinner";

const UserCollectionsPage = () => {
  let { email } = useParams();
  const isEditor = useIsEditor(email);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [collectionAuthor, setCollectionAuthor] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getAuthor = async (email) => {
    const { data } = await axios.get(getUserByEmailUrl(email));
    return data;
  };

  const getCollections = async (userId) => {
    const { data } = await axios.get(getCollectionsByUserIdUrl(userId));
    return data;
  };

  const deleteCollection = async (collectionId) => {
    try {
      await axios.delete(deleteCollectionByIdUrl(collectionId));
      setCollections(
        collections.filter((collection) => collection["_id"] !== collectionId)
      );
    } catch (e) {}
  };

  const addCollection = (collection) => {
    setCollections([...collections, collection]);
  };

  useEffect(() => {
    const fetchAll = async () => {
      setIsFetching(true);
      const author = await getAuthor(email);
      setCollectionAuthor(author);
      const authorsCollections = await getCollections(author["_id"]);

      setCollections(authorsCollections);
      setIsFetching(false);
    };
    fetchAll();
  }, []);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (collections.length === 0) {
    return (
      <>
        <CollectionCreator
          isOpen={isCreatorOpen}
          handleClose={() => setIsCreatorOpen(false)}
          author={collectionAuthor}
          addCollection={addCollection}
        />
        <Box sx={{ m: 3 }}>
          <Typography variant="h5">
            {email}'s collections ({collections.length})
          </Typography>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Stack direction="column" spacing={3}>
              <Typography variant="h5" textAlign="center">
                {translate("userHasNoCollections")}
              </Typography>
              {isEditor && (
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsCreatorOpen(true)}
                >
                  {translate("createCollection")}
                </Button>
              )}
            </Stack>
          </div>
        </Box>
      </>
    );
  }

  return (
    <>
      <CollectionCreator
        isOpen={isCreatorOpen}
        handleClose={() => setIsCreatorOpen(false)}
        author={collectionAuthor}
        addCollection={addCollection}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
        <Typography variant="h5">
          {email}'s collections ({collections.length})
        </Typography>
        {isEditor && (
          <Button
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreatorOpen(true)}
          >
            {translate("createCollection")}
          </Button>
        )}
      </Box>
      <Stack>
        {collections.map((collection) => {
          return (
            <CollectionPaper
              key={collection["_id"]}
              {...collection}
              isEditor={isEditor}
              deleteCollection={deleteCollection}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default UserCollectionsPage;
