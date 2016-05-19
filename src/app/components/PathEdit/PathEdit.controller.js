function PathEditCtrl($ngRedux) {
  this.addGetOperation = (pathName) => {
    $ngRedux.dispatch({
      type: 'ADD_GET_OPERATION',
      pathName,
    });
  };

  this.addPostOperation = (pathName) => {
    $ngRedux.dispatch({
      type: 'ADD_POST_OPERATION',
      pathName,
    });
  };

  this.addPutOperation = (pathName) => {
    $ngRedux.dispatch({
      type: 'ADD_PUT_OPERATION',
      pathName,
    });
  };

  this.addDeleteOperation = (pathName) => {
    $ngRedux.dispatch({
      type: 'ADD_DELETE_OPERATION',
      pathName,
    });
  };
}

PathEditCtrl.$inject = ['$ngRedux'];

export default PathEditCtrl;

