import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { makeStyles } from '@mui/styles';
import { Routes, Route, Link } from 'react-router-dom';

const useStyles = makeStyles({
  listIcon: {
    minWidth: '30px !important',
  },
});

const linkStyle = {};
export const MainListItems = props => {
  const classes = useStyles(props);
  const toggleDrawer = props.toggleDrawer;

  return (
    <React.Fragment>
      <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon className={classes.listIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Change base currency" />
        </ListItemButton>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon className={classes.listIcon}>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Сurrent exchange rates" />
        </ListItemButton>
      </Link>
      <Link
        to="/currencyConverter"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon className={classes.listIcon}>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Сurrency converter" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
