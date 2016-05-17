function InfoContainerCtrl($scope) {
  this.edit = false;

  $scope.$on('toggleEdit', (event, data) => {
    this.edit = data;
  });
}

InfoContainerCtrl.$inject = ['$scope'];

export default InfoContainerCtrl;
