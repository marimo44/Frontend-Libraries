//Map State to Props
const state = [];

// Change code below this line
function mapStateToProps(state) {
  return {
    messages: state
  };
}

//Map Dispatch to Props
const addMessage = (message) => {
    return {
      type: 'ADD',
      message: message
    }
  };
  
  // Change code below this line
  function mapDispatchToProps(dispatch) {
    return {
      submitNewMessage: function(message){
        dispatch(addMessage(message));
      }
    }
  }