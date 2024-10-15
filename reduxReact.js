//Manage State Locally First
class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
      // Binding methods should be inside the constructor
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
  
    handleChange(e) {
      this.setState({
        input: e.target.value
      });
    }
  
    submitMessage() {
      this.setState(state => ({
        messages: [...state.messages, state.input],
        input: ''
      }));
    }
  
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          <input onChange={this.handleChange} value={this.state.input} />
          <button onClick={this.submitMessage}>Submit</button>
          <ul>
            {this.state.messages.map((el, index) => <li key={index}>{el}</li>)}
          </ul>
        </div>
      );
    }
  }


  //Extract State Logic to Redux
  // Define ADD, addMessage(), messageReducer(), and store here:
const ADD = "ADD";

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
}

const messageReducer = (state = [], action) => {
  if (action.type === ADD) {
    return [...state, action.message];
  } else {
    return state;
  }
}

const store = Redux.createStore(messageReducer);

