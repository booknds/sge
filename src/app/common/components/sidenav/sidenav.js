import angular from "angular";
import SidenavComponent from "./sidenav.component";
import "./booknds_logo.svg";

export default angular
        .module("SidenavModule", [])
        .directive("sgSidenav", SidenavComponent);
