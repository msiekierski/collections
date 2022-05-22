import {
  Button,
  Divider,
  Stack,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsers,
  getUsers,
  selectUsersManagement,
  test,
  update,
  updateUsers,
} from "../../features/usersManagement/usersManagementSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import useWindowDimensions from "../hooks/useWindowDimensions";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";

const AdminPage = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const { isFetching, users, isUpdating } = useSelector(selectUsersManagement);
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!isUpdating) {
      dispatch(getUsers());
    }
  }, [isUpdating]);

  const columns = [
    { field: "id", headerName: "ID", width: width / 5 },
    { field: "email", headerName: "Email", width: width / 5 },
    {
      field: "createdAt",
      headerName: "Registred at",
      width: width / 5,
    },
    { field: "isAdmin", headerName: "Type", width: width / 5 },
    { field: "isBlocked", headerName: "Status", width: width / 6 },
  ];

  if (isFetching || isUpdating) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Panel
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <IconButton
          onClick={() => {
            dispatch(updateUsers({ selectedIds, values: { isBlocked: true } }));
            dispatch(getUsers());
          }}
        >
          <Avatar>
            <LockIcon />
          </Avatar>
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(
              updateUsers({ selectedIds, values: { isBlocked: false } })
            );
          }}
        >
          <Avatar>
            <LockOpenIcon />
          </Avatar>
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(updateUsers({ selectedIds, values: { isAdmin: true } }));
          }}
        >
          <Avatar>
            <GroupAddIcon />
          </Avatar>
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(updateUsers({ selectedIds, values: { isAdmin: false } }));
          }}
        >
          <Avatar>
            <GroupRemoveIcon />
          </Avatar>
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteUsers({ selectedIds }));
          }}
        >
          <Avatar>
            <DeleteIcon />
          </Avatar>
        </IconButton>
      </Stack>
      <div style={{ width: "100%", height: 400, marginTop: 30 }}>
        <DataGrid
          rows={users.map((user) => ({
            ...user,
            id: user["_id"],
            createdAt: new Date(user.createdAt).toLocaleDateString(),
            isBlocked: user.isBlocked ? "blocked" : "active",
            isAdmin: user.isAdmin ? "admin" : "regular",
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            setSelectedIds(Array.from(selectedIDs));
          }}
        />
      </div>
    </>
  );
};

export default AdminPage;
