import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './MainListItems';
import CurrencySettings from './CurrencySettings';
import Copyright from './Copyright';
import { Routes, Route } from 'react-router-dom';
import EchangeRates from './ExchangeRates';
import CurrencyConverter from './CurrencyConverter';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSupportedSymbolsLoading,
  useSupportedSymbols,
  getCurrencySymbols,
} from './../../store/slices/supportedSymbolsSlice';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: drawerWidth,
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useDispatch();
  const supportedSymbols = useSelector(useSupportedSymbols);
  const loadingSupportSymbols = useSelector(useSupportedSymbolsLoading);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!Object.keys(supportedSymbols).length) {
      dispatch(getCurrencySymbols());
    }
  }, [supportedSymbols, dispatch]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Simple Currency Converter App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems isOpen={open} toggleDrawer={toggleDrawer} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 65px)',
              paddingTop: '80px',
            }}
          >
            <Grid container spacing={0} sx={{ flexGrow: 1 }}>
              {!(loadingSupportSymbols.status === 'resolved') ? (
                <CircularProgress sx={{ mx: 'auto' }} />
              ) : (
                <>
                  <Grid item xs={0} sm={1} md={3}></Grid>
                  <Grid item xs={12} sm={10} md={6}>
                    <Routes>
                      <Route path="/" element={<EchangeRates />} />
                      <Route path="/settings" element={<CurrencySettings />} />
                      <Route
                        path="/currencyConverter"
                        element={<CurrencyConverter />}
                      />
                    </Routes>
                  </Grid>
                </>
              )}
            </Grid>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
