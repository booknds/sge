function PathViewMaxCtrl($scope) {
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

  this.minimize = function minimize() {
    $scope.$emit('maximize', false);
  };

  this.testClick = function testClick() {
    console.log('check check, its max');
  };
}

PathViewMaxCtrl.$inject = ['$scope'];

export default PathViewMaxCtrl;
