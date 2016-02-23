import angular from "angular";
import headerComponent from "./header.component";
import "./assets/github-icon.svg";

export default angular
    .module("header", [])
    .directive("sgHeader", headerComponent);
