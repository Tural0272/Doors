/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel({ value, text, color, ...rest }) {
  return (
    <Box position="relative" display="inline-flex" style={{ width: '100%', height: '100%' }}>
      <CircularProgress variant="determinate" value={value} {...rest} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color={color}
          style={{ textAlign: 'center' }}
        >{text}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

export default CircularProgressWithLabel;
