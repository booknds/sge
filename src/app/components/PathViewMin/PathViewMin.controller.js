function PathViewMinCtrl($scope) {
  this.state = {
    pathName: '/here/is/a/path',
    value: {
      get: {
        summary: 'A longer summary of a get method',
      },
    },
    ui: {
      maxView: false,
      edit: false,
      editState: {},
    },
  };

  this.maximize = function maximize() {
    testClick();
    $scope.$emit('maximize', true);
  };

  function testClick() {
    console.log('check check');
  };
}

PathViewMinCtrl.$inject = ['$scope'];

export default PathViewMinCtrl;
