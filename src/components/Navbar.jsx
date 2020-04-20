import React, { useState } from "react";
import { makeStyles, useTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, Switch, FormControlLabel } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
  },
  link1: {
    textDecoration: "none",
    cursor: "pointer",
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));
const themeObject = {
  palette: {
    type: "light",
  },
};
const useDarkMode = () => {
  const [utheme, setUheme] = useState(themeObject);
  const {
    palette: { type },
  } = utheme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...utheme,
      palette: {
        ...utheme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setUheme(updatedTheme);
  };
  return [utheme, toggleDarkMode];
};

const Navbar = () => {
  const [utheme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(utheme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeConfig}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Covid19
            </Typography>

            <div className={classes.grow} />
            <div>
              <Tooltip title="Turn on the lights" arrow>
                <Button>Toggle Mode</Button>
              </Tooltip>
              <FormControlLabel control={<Switch color="default" onClick={toggleDarkMode} />} />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
