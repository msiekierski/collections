import {
  Avatar,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getItemsManagerRoute } from "../constants/appRoutes";
import translate from "../utils/translate";

const CollectionPaper = ({
  name,
  topic,
  items,
  isEditor,
  _id,
  deleteCollection,
}) => {
  const navigate = useNavigate();
  let { email } = useParams();

  return (
    <Paper elevation={7} sx={{ padding: 3, m: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item sm={6} xs={12}>
          <div
            onClick={() => {
              navigate(getItemsManagerRoute(email, _id), {
                state: { collectionId: _id },
              });
            }}
          >
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar></Avatar>
                <Typography>
                  {name} - {topic}
                </Typography>
              </Stack>
            </Link>
          </div>
        </Grid>
        <Grid container sm={6} xs={12} justifyContent="flex-end">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>
              {translate("itemsCount")}: {items.length}
            </Typography>
            {isEditor && (
              <IconButton onClick={() => deleteCollection(_id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CollectionPaper;
