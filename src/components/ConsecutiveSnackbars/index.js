import React, { Fragment, Component } from 'react';
import { string, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  root: {
    color: '#F56236'
  }
});

class ConsecutiveSnackbars extends Component {
  static propTypes = {
    message: string,
    clearMessages: string
  }
  queue = [];

  state = {
    open: false,
    stateMessage: '',
  };
  
  static getDerivedStateFromProps({
      message,
      clearMessages
  }, {
    derivedStateMessage,
  }) {
    if(!clearMessages && message !== derivedStateMessage) {
        return {
          derivedStateMessage: message,
          open: true,
        }
    }
    return null;
  }
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { 
        classes,
        key,
     } = this.props;
     const {
       open, 
       derivedStateMessage,
     } = this.state;
    return (
      <Fragment>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleRequestClose}
          autoHideDuration={2000}
          ContentProps={{
            'aria-describedby': 'message-id',
            classes,
          }}
          message={<span id="message-id">{derivedStateMessage}</span>}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(ConsecutiveSnackbars);
