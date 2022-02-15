import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Title(props) {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: 'primary.main', fontWeight: '700' }}
      >
        {props.children}
      </Typography>
      <Divider light />
    </>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
