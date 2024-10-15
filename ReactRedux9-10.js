// Extract Local State into Redux
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/
// Redux:
const ADD = 'ADD';

// Action creator
const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

// Reducer function
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

// Create the Redux store
const store = Redux.createStore(messageReducer);

// React-Redux:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Presentational Component
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    // Local state only for input, messages are handled by Redux
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  
  submitMessage() {
    // Dispatch action to add message to Redux store
    this.props.submitNewMessage(this.state.input);
    // Clear input field
    this.setState({
      input: ''
    });
  }
  
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {/* Map over messages from Redux store */}
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

// Map Redux state to component props
const mapStateToProps = (state) => {
  return {messages: state}
};

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

// Connect Redux to React
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

// App wrapper
class AppWrapper extends React.Component {
  render() {
    return (
      // Provide Redux store to React components
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};