import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, Switch, FormControlLabel,CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import styles from "./App.module.css"
import coronaImage from './images/corona.png'
import { fetchData } from "./api/index";
const Cards = React.lazy(() => import("./components/Cards/Cards"));
const Chart  = React.lazy(() => import("./components/Chart/Chart"))
const CountryPicker = React.lazy(() => import("./components/CountryPicker/CountryPicker"))

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  table: { minWidth: 650 },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    flexDirection: "column",
    margin: theme.spacing(6),
    padding: theme.spacing(5),
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
function Home() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('')

  useEffect(() => {
    fetchData().then((response) => {
      const data = response;
      setData(data);
    });
  }, []);

  const handleCountryChange  = async (country) =>{
    fetchData(country).then(response=>{
      console.log(response)
      setData(response)
      setCountry(country)
    })
    // console.log(country)
  } 

  const [utheme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(utheme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeConfig}>
      <div className={classes.grow}>
        <CssBaseline />
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography className={classes.title} variant="h4" noWrap>
              COVID19
            </Typography>
            <div className={classes.grow} />
            <div>
              <FormControlLabel
                control={<Switch color="default" onClick={toggleDarkMode} />}
                label="Switch Mode"
              />
            </div>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar}>
            <React.Suspense fallback={<CircularProgress />}>
              <img  src={coronaImage} className={styles.image} alt="COVID-19" />
              <Cards data={data} />
              <CountryPicker handleCountryChange={handleCountryChange} />
              <Chart data={data} country={country} />
            </React.Suspense>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Home;
