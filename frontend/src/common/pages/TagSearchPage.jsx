import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemListElement from "../components/ItemListElement";
import LoadingSpinner from "../components/LoadingSpinner";
import { getItemsByTag, GET_UNIQUE_TAGS } from "../constants/apiUrls";
import { getTagSearchRoute } from "../constants/appRoutes";
import { Box } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const TagSearchPage = () => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const { tag } = useParams();
  const navigate = useNavigate();
  console.log("items");
  console.log(items);

  useEffect(() => {
    const fetchItems = async () => {
      setIsFetching(true);
      const items = await axios.get(getItemsByTag(tag));
      const tags = await axios.get(GET_UNIQUE_TAGS);
      setItems(items.data);
      setAllTags(tags.data);
      setIsFetching(false);
    };
    fetchItems();
  }, [tag]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box
        sx={{
          m: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3
        }}
      >
        <Autocomplete
          disablePortal
          disableClearable
          options={allTags}
          sx={{ width: 300 }}
          onChange={(e, value) => navigate(getTagSearchRoute(value))}
          defaultValue={tag}
          renderInput={(params) => <TextField {...params} label="Tag" />}
        />
        <Box width={"100%"} display="flex" flexDirection="column" gap={3}>
          {items.map((item, index) => (
            <ItemListElement key={index} {...item} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TagSearchPage;
