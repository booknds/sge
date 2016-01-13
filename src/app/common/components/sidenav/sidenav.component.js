import template from './sidenav.html';

export default SidenavComponent;

function SidenavComponent(){
  return{
    restrict: 'E',
    template,
    link:function(scope,element,attr){
      // Initialize collapse button
      $(".button-collapse").sideNav();
    }
  }
}
