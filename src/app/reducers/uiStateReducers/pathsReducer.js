const INITIAL_STATE = {
  '/defaultPath': {
    maximize: false,
    operations: {
      get: true,
    },
  },
};

function uiPathsReducer(state = INITIAL_STATE, action) {
  let newPaths;
  let newPath;

  switch (action.type) {
    case 'MAXIMIZE_PATH':
      newPath = angular.copy(state[action.pathName], {});
      newPath.maximize = true;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'MINIMIZE_PATH':
      newPath = angular.copy(state[action.pathName], {});
      newPath.maximize = false;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'DELETE_PATH':
      newPaths = Object.assign({}, state);
      delete newPaths[action.pathName];
      return newPaths;

    case 'EDIT_PATH':
      newPath = angular.copy(state[action.pathName], {});
      newPath.edit = action.edit;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_GET_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.operations.get = true;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_POST_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.operations.post = true;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_PUT_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.operations.put = true;

      return Object.assign({}, state, { [action.pathName]: newPath });

    case 'ADD_DELETE_OPERATION':
      newPath = angular.copy(state[action.pathName], {});
      newPath.operations.delete = true;

      return Object.assign({}, state, { [action.pathName]: newPath });

    default:
      return state;
  }
}

export default uiPathsReducer;
