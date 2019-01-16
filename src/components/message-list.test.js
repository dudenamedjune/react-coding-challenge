import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {
  ERROR_PAPER,
  WARNING_PAPER,
  INFO_PAPER,
} from './CenteredGrid';
import MessageList from './message-list.js';
import Api from '../api';
jest.mock('../api');

const shallow = createShallow();
  
describe('<MyComponent />', () =>   {
  const messageListComponent = shallow(<MessageList />);
  describe('render', () => {
    it('renders without blowing up', () => {
      
      expect(messageListComponent.exists()).toBe(true);
    });
  });
  describe('componentWillMount', () => {
    it('calls the API', () => {
      expect(Api).toHaveBeenCalled();
    });
  });

  describe('switchPriority', () => {
    it('returns an object with priority key value as ERROR_PAPER, message value as second arg, snackBarMessage as second arg when 1st arg equals 1', () => {
      const expectedReturn = { 
        priority: ERROR_PAPER,
        message: 'Pickle Rick',
        snackBarMessage: 'Pickle Rick'
      };
      const returnValue = messageListComponent.instance().switchPriority(1, 'Pickle Rick');
      expect(returnValue).toEqual(expectedReturn);
    });
    it('returns an object with priority key value as WARNING_PAPER, message value as second arg, when 1st arg equals 2', () => {
      const expectedReturn = { 
        priority: WARNING_PAPER,
        message: 'Yeeehaw',
      };
      const returnValue = messageListComponent.instance().switchPriority(2, 'Yeeehaw');
      expect(returnValue).toEqual(expectedReturn);
    });
    it('returns an object with priority key value as WARNING_PAPER, message value as second arg, when 1st arg equals 3', () => {
      const expectedReturn = { 
        priority: INFO_PAPER,
        message: 'They did surgery on a grape'
      };
      const returnValue = messageListComponent.instance().switchPriority(3, 'They did surgery on a grape');
      expect(returnValue).toEqual(expectedReturn);
    });
  });

  describe('messageCallback', () => {
    const arg = { priority: 1, message: 'foobar'};
    messageListComponent.instance().messageCallback({ priority: 1, message: 'foobar'});
    expect(messageListComponent.state().snackBarMessage).toEqual('foobar');
    expect(messageListComponent.state().clearMessages).toEqual(false);
    expect(messageListComponent.state().messages).toEqual([{ priority: ERROR_PAPER, message: 'foobar' }]);
  });

  describe('clearMessages Button', () => {
    it('clears state when clear button is clicked', () => {
      messageListComponent.find('[variant="contained"]').at(1).simulate('click');
      expect(messageListComponent.state()).toEqual({
        messages: [],
        snackBarMessage: '',
        clearMessages: true
      });
    });
  });
});