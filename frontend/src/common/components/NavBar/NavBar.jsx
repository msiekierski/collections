import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Button,
  FormControlLabel,
  Menu,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";
import {
  COLLECTION_MANAGER_ROUTE,
  getCollectionManagerRoute,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ADMIN_ROUTE,
} from "../../constants/appRoutes";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ADMIN, GUEST, REGULAR } from "../../constants/authStates";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectUser,
  toggleThemeMode,
} from "../../../features/user/userSlice";
import SearchBar from "./SearchBar";



const NavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { settings } = user;
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box>
      <AppBar
        position="static"
        enableColorOnDark={settings.isDarkMode}
        color="default"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to={HOME_ROUTE}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" noWrap component="div">
              Wonderful Collections
            </Typography>
          </Link>
          <SearchBar />
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={settings.isDarkMode}
                  onChange={(e) => dispatch(toggleThemeMode())}
                />
              }
              label="Dark mode"
            />
            {auth === GUEST && (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Log In
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => navigate(REGISTER_ROUTE)}
                >
                  Register
                </Button>
              </>
            )}
            {auth !== GUEST && (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    <PersonOutlineIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorElUser(null);
                      navigate(getCollectionManagerRoute(user.user.email));
                    }}
                  >
                    <Typography textAlign="center">Collections</Typography>
                  </MenuItem>
                  {auth === ADMIN && (
                    <MenuItem
                      onClick={() => {
                        setAnchorElUser(null);
                        navigate(ADMIN_ROUTE);
                      }}
                    >
                      <Typography>Admin panel</Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      setAnchorElUser(null);
                      dispatch(logOut());
                      navigate(HOME_ROUTE);
                    }}
                  >
                    <Typography textAlign="center" style={{ color: "red" }}>
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
