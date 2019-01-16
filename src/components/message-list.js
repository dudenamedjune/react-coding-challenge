import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import CenteredGrid from './CenteredGrid';
import {
  ERROR_PAPER,
  WARNING_PAPER,
  INFO_PAPER,
} from './CenteredGrid';
class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.initState = {
      messages: [],
      snackBarMessage: ''
    }
    this.state = {
     ...this.initState,
    }
  }

  componentWillMount() {
    this.api = new Api({
      messageCallback: (message) => {
        this.messageCallback(message)
      },
    })
  }

  componentDidMount() {
    this.api.start()
  }

  switchPriority = (priority, message) => {
      switch(priority) {
      case 1:
        return {
          priority: ERROR_PAPER,
          message,
          snackBarMessage: message, 
        };
      case 2:
        return {
          priority: WARNING_PAPER,
          message
        };
      case 3:
        return {
          priority: INFO_PAPER,
          message
        };
    }
  }

  messageCallback({ priority, message }) {
    const { messages } = this.state
    const {
      snackBarMessage,
      ...rest
    }  = this.switchPriority(priority, message);
    this.setState({
      snackBarMessage,
      clearMessages: false,
      messages: [
           rest,
        ...messages.slice(),
      ],
    });
  }

  renderButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        variant="contained"
        onClick={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.forceUpdate()
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  renderClearMessages() {
    return (
      <Button
        variant="contained"
        onClick={() => {
          this.setState({
            ...this.initState,
            clearMessages: true,
          });
        }}
      >
       Clear Messages
      </Button>
    )
   
  }

  render() {
    return (
      <div style={{ paddingTop: '2rem'}}>
        {this.renderButton()}
        {this.renderClearMessages()}
        <CenteredGrid
            {...this.state} 
          />
      </div>
    )
  }
}

export default MessageList
