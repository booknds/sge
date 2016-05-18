function InfoContainerCtrl($ngRedux) {
  const unsubscribe = $ngRedux.connect(mapStateToCtrl)(this);

  this.$onDestroy = unsubscribe;

  this.editInfo = editInfo;

  function mapStateToCtrl(state) {
    return {
      info: state[0].swaggerDefinition.info,
      infoState: state[0].uiState.info,
    };
  }

  function editInfo() {
    $ngRedux.dispatch({
      type: 'TOGGLE_INFO_EDIT',
      payload: true,
    });
  }
}

InfoContainerCtrl.$inject = ['$ngRedux'];

export default InfoContainerCtrl;
