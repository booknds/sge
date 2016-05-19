const INITIAL_STATE = {
  edit: false,
};

function infoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'TOGGLE_INFO_EDIT':
      return Object.assign({}, state,
        {
          edit: action.edit,
        }
      );

    case 'ADD_CONTACT':
      return Object.assign({}, state,
        {
          contact: true,
        }
      );

    case 'ADD_LICENSE':
      return Object.assign({}, state,
        {
          license: true,
        }
      );


    case 'DELETE_CONTACT':
      return Object.assign({}, state,
        {
          contact: false,
        }
      );


    case 'DELETE_LICENSE':
      return Object.assign({}, state,
        {
          license: false,
        }
      );


    default:
      return state;
  }
}

export default infoReducer;
