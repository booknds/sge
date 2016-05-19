const INITIAL_STATE = {
  title: 'My Api\'s Title!',
  version: 'My Api\'s Version!',
  description: 'Click the edit button on the right to update the information!',
};

function infoReducer(state = INITIAL_STATE, action) {
  let newState;

  switch (action.type) {

    case 'ADD_CONTACT':
      return Object.assign({}, state,
        {
          contact: {},
        }
      );

    case 'ADD_LICENSE':
      return Object.assign({}, state,
        {
          license: {},
        }
      );

    case 'DELETE_CONTACT':
      newState = Object.assign({}, state);
      delete newState.contact;

      return newState;

    case 'DELETE_LICENSE':
      newState = Object.assign({}, state);
      delete newState.license;

      return newState;

    default:
      return state;
  }
}

export default infoReducer;
