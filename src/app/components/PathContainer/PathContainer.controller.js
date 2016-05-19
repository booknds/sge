function PathContainerCtrl($ngRedux) {
  const unsubscribe = $ngRedux.connect(mapStateToCtrl)(this);

  this.$onDestroy = unsubscribe;

  this.minimize = minimize;
  this.maximize = maximize;
  this.editPath = editPath;
  this.deletePath = deletePath;

  function mapStateToCtrl({ rootReducer }) {
    const state = rootReducer;
    return {
      paths: state.readableDefinition.paths,
      editablePaths: state.editableDefinition.paths,
      pathsState: state.uiState.paths,
    };
  }

  function minimize(pathName) {
    $ngRedux.dispatch({
      type: 'MINIMIZE_PATH',
      pathName,
    });
  }

  function maximize(pathName) {
    $ngRedux.dispatch({
      type: 'MAXIMIZE_PATH',
      pathName,
    });
  }

  function editPath(pathName) {
    $ngRedux.dispatch({
      type: 'EDIT_PATH',
      pathName,
      edit: true,
    });
  }

  function deletePath(pathName) {
    $ngRedux.dispatch({
      type: 'DELETE_PATH',
      pathName,
    });
  }
}

PathContainerCtrl.$inject = ['$ngRedux'];

export default PathContainerCtrl;
