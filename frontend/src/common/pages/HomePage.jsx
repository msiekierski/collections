import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getLargestCollectionsUrl,
  getLatestItemsUrl,
} from "../constants/apiUrls";
import { CircularProgress, Grid, List, Typography } from "@mui/material";
import ItemPreview from "../components/ItemPreview";
import { Box } from "@mui/system";
import CollectionList from "../components/CollectionList";

const HomePage = () => {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const latestItems = await axios.get(getLatestItemsUrl(6));
      const largestCollections = await axios.get(getLargestCollectionsUrl(5));
      setData({
        ...data,
        latestItems: latestItems.data,
        largestCollections: largestCollections.data,
      });
      setIsFetching(false);
    };
    fetchData();
  }, []);

  if (isFetching) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  console.log(data);

  return (
    <Box sx={{ m: 3, display: "flex", flexDirection: "column", gap: 6 }}>
      <Box>
        <Typography variant="h4" textAlign="start" sx={{ mb: 1 }}>
          6 latest items
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {data.latestItems.map((item, index) => (
            <Grid xl={2} md={4} item key={index}>
              <ItemPreview {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Typography textAlign="start" variant="h4" sx={{ mb: 1 }}>
          Largest collections
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CollectionList collections={data.largestCollections} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
