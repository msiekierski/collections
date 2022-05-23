import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Badge,
  Button,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Switch,
  useMediaQuery,
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
  setLanguage,
  toggleThemeMode,
} from "../../../features/user/userSlice";
import SearchBar from "./SearchBar";
import CheckIcon from "@mui/icons-material/Check";
import { ENGLISH_LANGUAGE, POLISH_LANGUAGE } from "../../constants/languages";
import translate from "../../utils/translate";
import { useTheme } from "@emotion/react";

const NavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { settings } = user;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();

  const matches = useMediaQuery(
    theme.breakpoints.down(auth === GUEST ? 1450 : 1180)
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      enableColorOnDark={settings.isDarkMode}
      color="default"
    >
      <Toolbar
      // sx={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   flexDirection: matches ? "column" : "row",
      //   flexWrap: "wrap",
      //   gap: 3,
      //   p: 1,
      // }}
      >
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={matches ? "column" : "row"}
          flexWrap="wrap"
          gap={1}
          padding={1}
        >
          <Grid item>
            <Link
              to={HOME_ROUTE}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" noWrap component="div">
                Wonderful Collections
              </Typography>
            </Link>
          </Grid>
          <Grid item width={`${matches ? "100%" : "50%"}`}>
            <SearchBar />
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={settings.isDarkMode}
                    onChange={(e) => dispatch(toggleThemeMode())}
                  />
                }
                label={translate("darkTheme")}
              />
              <div
                onClick={() => dispatch(setLanguage(ENGLISH_LANGUAGE))}
                style={{ cursor: "pointer" }}
              >
                <Badge
                  badgeContent={
                    settings.language === ENGLISH_LANGUAGE ? (
                      <CheckIcon sx={{ color: "green" }} />
                    ) : null
                  }
                >
                  <Avatar src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg" />
                </Badge>
              </div>
              <div
                onClick={() => dispatch(setLanguage(POLISH_LANGUAGE))}
                style={{ cursor: "pointer" }}
              >
                <Badge
                  badgeContent={
                    settings.language === POLISH_LANGUAGE ? (
                      <CheckIcon sx={{ color: "green" }} />
                    ) : null
                  }
                >
                  <Avatar src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PL.svg" />
                </Badge>
              </div>

              {auth === GUEST && (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate(LOGIN_ROUTE)}
                  >
                    {translate("login")}
                  </Button>

                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate(REGISTER_ROUTE)}
                  >
                    {translate("register")}
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
                      <Typography textAlign="center">
                        {translate("collections")}
                      </Typography>
                    </MenuItem>
                    {auth === ADMIN && (
                      <MenuItem
                        onClick={() => {
                          setAnchorElUser(null);
                          navigate(ADMIN_ROUTE);
                        }}
                      >
                        <Typography>{translate("adminPanel")}</Typography>
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
                        {translate("logOut")}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
