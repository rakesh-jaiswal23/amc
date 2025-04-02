import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { EMPTY_OBJECT } from '../../constants';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

Alert.displayName = 'Alert';

function ErrorSnackBar(props) {
  const { opensnackbar, handleClose } = props;
  return (
    <div>
      {!!opensnackbar && !!opensnackbar.message && (
        <Snackbar
          open={opensnackbar.setopen}
          autoHideDuration={
            opensnackbar.duration ? opensnackbar.duration : 4000
          }
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity={opensnackbar.severity}
            sx={{ width: '100%' }}
          >
            {opensnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

ErrorSnackBar.propTypes = {
  opensnackbar: PropTypes.object,
  handleClose: PropTypes.func,
};

ErrorSnackBar.defaultProps = {
  opensnackbar: EMPTY_OBJECT,
  handleClose: noop,
};

export default ErrorSnackBar;
