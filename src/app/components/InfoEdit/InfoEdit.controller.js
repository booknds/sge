function InfoEditCtrl($ngRedux) {
 // this.editableInfo = {};

  this.$onInit = () => {
   // this.editableInfo = Object.assign({}, this.info);
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

    // delete this.editableInfo.contact;
  };

  this.deleteLicense = function deleteLicense() {
    $ngRedux.dispatch({
      type: 'DELETE_LICENSE',
      payload: false,
    });

    // delete this.editableInfo.license;
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

