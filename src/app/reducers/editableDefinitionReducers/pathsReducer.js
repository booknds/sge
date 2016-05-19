const INITIAL_STATE = {
  '/defaultPath': {
    get: {
      summary: 'Click on the edit button to change this path!',
    },
  },
};

function editablePathsReducer(state = INITIAL_STATE, action) {
  let newPaths;
  let newPath;

  switch (action.type) {
    case 'DELETE_PATH':
      newPaths = Object.assign({}, state);
      delete newPaths[action.pathName];
      return newPaths;
    case 'ADD_GET_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.get = {};

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_POST_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.post = {};

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_PUT_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.put = {};

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_DELETE_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.delete = {};

      return Object.assign({}, state, { [action.pathName]: newPath });


    default:
      return state;
  }
}

export default editablePathsReducer;
