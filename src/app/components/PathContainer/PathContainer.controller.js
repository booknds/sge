function PathContainerCtrl($scope) {
  this.max = false;

  $scope.$on('maximize', (event, data) => {
    console.log('recieved!', data);
    this.max = data;
  });
}

PathContainerCtrl.$inject = ['$scope'];

export default PathContainerCtrl;
