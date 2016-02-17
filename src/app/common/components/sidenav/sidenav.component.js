import template from "./sidenav.html";
import controller from "./sidenav.controller";

let sideNavComp = ["$document", SidenavComponent];

export default sideNavComp;

function SidenavComponent($document){
    return {
        restrict: "E",
        template,
        controller,
        replace:true,
        controllerAs:"sidenav",
        link:function(scope, element){
            // Initialize collapse button
            //$(".button-collapse").sideNav(
            element.find(".button-collapse").sideNav(
                {
                    menuWidth: 300, // Default is 240
                    edge: "right", // Choose the horizontal origin
                    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                
                }
            );

            

            //console.log(element);
            //console.log(get)

            $document.ready(function(){
                element.find(".collapsible").collapsible({
                    // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    accordion : false 
                });
            });
        }
    };
}
