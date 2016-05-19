function InfoContainerCtrl($ngRedux) {
  const unsubscribe = $ngRedux.connect(mapStateToCtrl)(this);

  this.$onDestroy = unsubscribe;

  this.editInfo = editInfo;

  function mapStateToCtrl({ rootReducer }) {
    const state = rootReducer;
    console.log(state);
    return {
      info: state.readableDefinition.info,
      editableInfo: state.editableDefinition.info,
      infoState: state.uiState.info,
    };
  }

  function editInfo() {
    $ngRedux.dispatch({
      type: 'TOGGLE_INFO_EDIT',
      edit: true,
    });
  }
}

InfoContainerCtrl.$inject = ['$ngRedux'];

export default InfoContainerCtrl;
