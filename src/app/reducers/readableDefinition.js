import readableInfo from './readableDefinitionReducers/infoReducer.js';
import readablePaths from './readableDefinitionReducers/pathsReducer.js';

const INITIAL_STATE = {
  swagger: '2.0',
  info: {},
  paths: {},
  definitions: {},
};

function readableDefinitionReducer(state = INITIAL_STATE, action) {
  return {
    swagger: '2.0',
    info: readableInfo(state.info, action),
    paths: readablePaths(state.paths, action),
    // definitions: readableDefinitions(state.definitions, action),
    definitions: {},
  };
}

export default readableDefinitionReducer;
