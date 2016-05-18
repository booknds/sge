function InfoEditCtrl($ngRedux) {
  this.editableInfo = {};

  this.$onInit = () => {
    this.editableInfo = Object.assign({}, this.info);
  };

  const syncEditableInfo = () => {
    this.editableInfo = Object.assign(angular.copy(this.info), this.editableInfo);
  };

  this.addContact = function addContact() {
    $ngRedux.dispatch({
      type: 'ADD_CONTACT',
      payload: true,
    });
//    syncEditableInfo();
  };

  this.addLicense = function addLicense() {
    $ngRedux.dispatch({
      type: 'ADD_LICENSE',
      payload: true,
    });
//    syncEditableInfo();
  };

  this.deleteContact = function deleteContact() {
    $ngRedux.dispatch({
      type: 'DELETE_CONTACT',
      payload: false,
    });
  };

  this.deleteLicense = function deleteLicense() {
    $ngRedux.dispatch({
      type: 'DELETE_LICENSE',
      payload: false,
    });
  };

  this.submitInfo = function submitInfo(updatedInfo) {
    $ngRedux.dispatch({
      type: 'UPDATE_INFO',
      payload: updatedInfo,
    });

    $ngRedux.dispatch({
      type: 'TOGGLE_INFO_EDIT',
      payload: false,
    });
  };
}

InfoEditCtrl.$inject = ['$ngRedux'];

export default InfoEditCtrl;

