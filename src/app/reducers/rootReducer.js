import readableDefinition from './readableDefinition';
import editableDefinition from './editableDefinition';
import uiState from './uiState';

const INITIAL_STATE = {
  readableDefinition: {},
  editableDefinition: {},
  uiState: {},
};

function rootReducer(state = INITIAL_STATE , action) {
  return {
    readableDefinition: readableDefinition(state.readableDefinition, action),
    editableDefinition: editableDefinition(state.editableDefinition, action),
    uiState: uiState(state.uiState, action),
  };
}

export default { rootReducer };
