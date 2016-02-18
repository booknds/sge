import angular from "angular";
import Common from "./common/common";
import Components from "./components/components";
import appComponent from "./app.component";
import angular_materialize from "angular-materialize";
import FileSaver from "angular-file-saver";
import AngularMaterial from "angular-material";
import AngularAnimate from "angular-animate";
import AngularAria from "angular-aria";
import AngularMessages from "angular-messages";
// import AngularMocks from "angular-mocks/ngMock";
import "angular-material/angular-material.css";
import "../css/main.css";

"use strict";

// console.log(AngularMocks);

angular
    .module("SwaggerGraphicalEditor", [
        // 'ui.materialize',
        angular_materialize,
        "ngFileSaver",
        Common.name,
        Components.name,
        AngularMaterial,
        AngularAnimate,
        AngularAria,
        AngularMessages
        // AngularMocks
        // 'ngMaterial',
        // 'ngAnimate',
        // 'ngAria'
    ])

  .directive("app", appComponent);

$log(FileSaver);