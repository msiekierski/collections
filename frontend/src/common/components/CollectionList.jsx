import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCollectionPageRoute } from "../constants/appRoutes";

const CollectionList = ({ collections }) => {
  const navigate = useNavigate();
  return (
    <List sx={{ width: "80%" }}>
      {collections.map(({ ct, info }, index) => (
        <>
          <ListItemButton
            onClick={() => {
              navigate(getCollectionPageRoute(info["_id"]));
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={`${index + 1}. ${info.name} - ${ct} item(s)`}
              secondary={
                <Typography noWrap>
                  <MDEditor.Markdown
                    style={{ background: "inherit" }}
                    source={info.description}
                  />
                </Typography>
              }
            />
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

export default CollectionList;
