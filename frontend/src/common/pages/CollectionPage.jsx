import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCollectionByIdUrl } from "../constants/apiUrls";
import axios from "axios";
import { Box } from "@mui/system";
import {
  Avatar,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { getItemPageRoute } from "../constants/appRoutes";
import translate from "../utils/translate";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const { data } = await axios.get(getCollectionByIdUrl(collectionId));
      setTableRows([
        { name: translate("author"), value: data.authorId.email },
        { name: translate("name"), value: data.name },
        { name: translate("topic"), value: data.topic },
      ]);
      setCollection(data);
    };
    fetchCollection();
  }, []);

  if (collection === null) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        m: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Avatar />
      <TableContainer component={Paper} sx={{ p: 3 }}>
        <Table>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
      <Box width={"100%"} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5">{translate("description")}</Typography>
        <Paper sx={{ p: 3 }}>
          <Typography noWrap>
            <MDEditor.Markdown
              style={{ background: "inherit" }}
              source={collection.description}
            />
          </Typography>
        </Paper>
      </Box>
      <Box width={"100%"} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5">{translate("collectionItems")}</Typography>
        {collection.items.map(({ name, tags, _id }) => (
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
                      onClick={() => {}}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CollectionPage;
