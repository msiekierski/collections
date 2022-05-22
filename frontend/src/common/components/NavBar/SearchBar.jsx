import React, { useEffect, useRef, useState } from "react";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
import { getSearchResult } from "../../constants/apiUrls";
import {
  ClickAwayListener,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getItemPageRoute } from "../../constants/appRoutes";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // "&:focus": {
      //   width: "100%",
      // },
    },
  },
}));

const SearchBar = () => {
  const [text, setText] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const search = async (searchText) => {
      const { data } = await axios.get(getSearchResult(searchText));
      if (searchText === text) {
        setSearchItems(data);
      }
      if (data.length > 0) {
        setShowResults(true);
      }
    };
    if (text) {
      setShowResults(false);
      search(text);
    }
  }, [text]);

  console.log(searchItems);

  return (
    <>
      <Search ref={searchBarRef}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          fullWidth
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Search>
      <Popper
        open={showResults}
        anchorEl={searchBarRef.current}
        sx={{
          width:
            searchBarRef !== null && searchBarRef.current !== null
              ? searchBarRef.current.clientWidth
              : "inherit",
        }}
      >
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
          <Paper>
            <List>
              {searchItems.map((item, index) => (
                <ListItemButton
                  onClick={() => {
                    setText("");
                    setShowResults(false);
                    navigate(getItemPageRoute(item["_id"]));
                  }}
                  key={index}
                >
                  <Grid>
                    <Typography>
                      {item.name} from {item.collectionId.name} collection
                    </Typography>
                  </Grid>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SearchBar;
