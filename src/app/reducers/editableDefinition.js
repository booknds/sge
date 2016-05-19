import editableInfo from './editableDefinitionReducers/infoReducer.js';
import editablePaths from './editableDefinitionReducers/pathsReducer.js';

const INITIAL_STATE = {
  swagger: '2.0',
  info: {},
  paths: {},
  definitions: {},
};

function editableDefinitionReducer(state = INITIAL_STATE, action) {
  return {
    swagger: '2.0',
    info: editableInfo(state.info, action),
    paths: editablePaths(state.paths, action),
    // definitions: editableDefinitions(state.definitions, action),
    definitions: {},
  };
}

export default editableDefinitionReducer;
