const INITIAL_STATE = {
  title: 'My Api\'s Title!',
  version: 'My Api\'s Version!',
  description: 'Click the edit button on the right to update the information!',
};

function infoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'UPDATE_INFO':
      let newInfoState = {};
      newInfoState = angular.copy(action.payload);

      return newInfoState;
    default:
      return state;
  }
}

export default infoReducer;
