function infoReducer(state, action) {

  switch (action.type) {
    case 'TOGGLE_INFO_EDIT':
      const infoState = angular.copy(state.uiState.info);
      infoState.edit = action.payload;
      state.uiState.info = infoState;
      break;
    case 'ADD_CONTACT':
      if (!state.editableDefinition.info.contact && !state.uiState.info.contact) {
        state.editableDefinition.info.contact = {};
        state.uiState.info.contact = true;
      }
      break;
    case 'ADD_LICENSE':
      if (!state.editableDefinition.info.license && !state.uiState.info.license) {
        state.editableDefinition.info.license = {};
        state.uiState.info.license = true;
      }
      break;

    case 'DELETE_CONTACT':
      if (state.editableDefinition.info.contact && state.uiState.info.contact) {
        delete state.editableDefinition.info.contact;
        state.uiState.info.contact = false;
      }
      break;
    case 'DELETE_LICENSE':
      if (state.editableDefinition.info.license && state.uiState.info.license) {
        delete state.editableDefinition.info.license;
        state.uiState.info.license = false;
      }
      break;
    case 'UPDATE_INFO':
      let newInfoState = {};
      newInfoState = angular.copy(action.payload);
      state.readableDefinition.info = newInfoState;
      break;
    default:
      return state;
  }

  return state;
}

export default infoReducer;
