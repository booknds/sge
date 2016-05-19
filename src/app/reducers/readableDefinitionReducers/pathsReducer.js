const INITIAL_STATE = {
  '/defaultPath': {
    get: {
      summary: 'Click on the edit button to change this path!',
    },
  },
};

function readablePathsReducer(state = INITIAL_STATE, action) {
  let newPaths;

  switch (action.type) {
    case 'DELETE_PATH':
      newPaths = Object.assign({}, state);
      delete newPaths[action.pathName];
      return newPaths;
    default:
      return state;
  }
}

export default readablePathsReducer;
