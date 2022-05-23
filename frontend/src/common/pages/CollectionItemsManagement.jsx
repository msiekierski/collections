import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCollection,
  removeItemsByIds,
  selectCollectionItems,
} from "../../features/collectionItemsManagement/collectionItemsSlice";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemCreator from "../../common/components/ItemCreator";
import { removeItems } from "../../features/collectionItemsManagement/collectionItemsAPI";
import translate from "../utils/translate";

const CollectionItemsManagement = () => {
  const { email, collectionId } = useParams();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const { isFetching, items, name, topic, customFields, uniqueTags } =
    useSelector(selectCollectionItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  const columnsCount = 3 + customFields.length + 1;
  const columns = [
    { field: "id", headerName: "ID", width: width / columnsCount },
    { field: "name", headerName: "Name", width: width / columnsCount },
    { field: "tags", headerName: "Tags", width: width / columnsCount },
  ];
  customFields.forEach((customField) => {
    columns.push({
      field: customField.name,
      headerName: customField.name,
      width: width / columnsCount,
    });
  });

  useEffect(() => {
    dispatch(fetchCollection(collectionId));
  }, []);

  if (isFetching) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  const handleDeleteSelectedClick = async () => {
    if (selectedIds.length) {
      await removeItems(selectedIds);
      dispatch(removeItemsByIds(selectedIds));
    }
  };
  return (
    <>
      <ItemCreator
        isOpen={isCreatorOpen}
        handleClose={() => setIsCreatorOpen(false)}
        customFields={customFields}
        uniqueTags={uniqueTags}
        collectionId={collectionId}
      />
      <div style={{ margin: 10 }}>
        <Typography
          component="div"
          variant="h4"
          textAlign="center"
          sx={{ m: 3 }}
        >
          {translate("collection")}: {name}
        </Typography>
        <Typography component="div" variant="h5" textAlign="center">
          ({topic})
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 5 }}>
          <Button
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreatorOpen(true)}
          >
            {translate("createItem")}
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteSelectedClick()}
          >
            {translate("deleteSelected")}
          </Button>
        </Stack>
        <div style={{ width: "100%", height: 400, marginTop: 30 }}>
          <DataGrid
            rows={items.map((item) => {
              const tableItem = {
                id: item["_id"],
                name: item.name,
                tags: item.tags,
              };
              item.customFieldsValues.forEach(
                ({ name, value }) => (tableItem[name] = value)
              );
              return tableItem;
            })}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              setSelectedIds(Array.from(selectedIDs));
            }}
            columns={columns}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default CollectionItemsManagement;
