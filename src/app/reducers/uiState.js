import uiInfo from './uiStateReducers/infoReducer.js';
import uiPaths from './uiStateReducers/pathsReducer.js';

const INITIAL_STATE = {
  info: {},
  paths: {},
  definitions: {},
};

function uiStateReducer(state = INITIAL_STATE, action) {
  return {
    info: uiInfo(state.info, action),
    paths: uiPaths(state.paths, action),
    // definitions: uistates(state.definitions, action),
    definitions: {},
  };
}

export default uiStateReducer;
