import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link } from 'react-router-dom';

export const MainListItems = props => {
  const toggleDrawer = props.toggleDrawer;

  return (
    <React.Fragment>
      <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Change base currency" />
        </ListItemButton>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
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
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Сurrency converter" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};
