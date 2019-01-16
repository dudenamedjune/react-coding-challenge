import React, { Component } from 'react';
import { 
  arrayOf,
  string,
  shape,
  object
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MessageList from '../message-list';
import ConsecutiveSnackbars from '../ConsecutiveSnackbars'

export const ERROR_PAPER = 'errorPaper';
export const WARNING_PAPER = 'warningPaper';
export const INFO_PAPER = 'infoPaper';

const styles = theme => {
  const basePaper = {
      margin: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary, 
    };
    return {
      root: {
        flexGrow: 1,
      },
      [ERROR_PAPER]: {
        ...basePaper,
        background: '#F56236'
      },
      [WARNING_PAPER]: {
        ...basePaper,
        background: '#FCE788'
      },
      [INFO_PAPER]: {
        ...basePaper,
        background: '#88FCA3'
      }
    }
  };

class CenteredGrid extends Component {
  static propTypes = {
    messages: arrayOf(shape({
      priority: string,
      message: string
    })),
    snackBarMessage: string,
    classes: object.isRequired,
    clearMessages: string
  }
  render() {
      const { 
        classes: {
          root,
        },
        messages,
        snackBarMessage,
        clearMessages
      } = this.props;
      return (
        <div className={root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
            {
              messages.map(({message, priority}) => {
                const {
                  classes: {
                    [priority]: paperClass,
                  }
                } = this.props;
              return <Paper key={message} className={paperClass}>{message}</Paper>
              })
            }
            </Grid>
          </Grid>
            <ConsecutiveSnackbars message={snackBarMessage} key={snackBarMessage} clearMessages={clearMessages}/>
        </div>
      );
    }
}

export default withStyles(styles)(CenteredGrid);
