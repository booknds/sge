function OperationCtrl($ngRedux) {
  const unsubscribe = $ngRedux.connect(mapStateToCtrl)(this);

  function mapStateToCtrl({ rootReducer }) {
    const state = rootReducer;
    return {
      definitions: Object.keys(state.readableDefinitions.definitions),
    };
  }

  this.$onInit = () => {
    this.pathName = this.path.pathName;
  };

  this.in = [
    'path',
    'query',
    'header',
    'body',
    'formData',
  ];

  this.addParameter = (pathName, operation) => {
    console.log(pathName, operation);
    $ngRedux.dispatch({
      type: 'ADD_PARAMETER',
      pathName,
      operation,
    });
  };

  this.addResponse = (pathName, operation) => {
    $ngRedux.dispatch({
      type: 'ADD_RESPONSE',
      pathName,
      operation,
    });
  };
}

OperationCtrl.$inject = ['$ngRedux'];

export default OperationCtrl;
