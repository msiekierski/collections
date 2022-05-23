import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItemPageRoute, getTagSearchRoute } from "../constants/appRoutes";

const ItemListElement = ({ name, tags, _id }) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={7} sx={{ padding: 3, width: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        flexWrap="wrap"
      >
        <Grid item>
          <Link
            to={getItemPageRoute(_id)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography>{name}</Typography>
          </Link>
        </Grid>
        <Grid item sm={6}>
          <Box
            display="flex"
            alignItems="end"
            justifyContent="end"
            gap={1}
            flexWrap="wrap"
          >
            {tags.map((tag, index) => (
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemListElement;
