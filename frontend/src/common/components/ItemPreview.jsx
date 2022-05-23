import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getItemPageRoute } from "../constants/appRoutes";
import translate from "../utils/translate";

const ItemPreview = ({ name, collectionId, _id }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 250 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">
          {translate("from")} {!!collectionId && collectionId.name}{" "}
          {translate("collection")}
        </Typography>
        <Typography color="text.secondary" noWrap={true}>
          {translate("createdBy") }{" "}
          {!!collectionId &&
            !!collectionId.authorId &&
            collectionId.authorId.email}
          {""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(getItemPageRoute(_id))}>
          {translate("learnMore")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemPreview;
