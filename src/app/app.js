import Common from "./common/common";
import Components from "./components/components";
import appComponent from "./app.component";
import angularMaterialize from "angular-materialize";
import FileSaver from "angular-file-saver";
import AngularMaterial from "angular-material";
import AngularAnimate from "angular-animate";
import AngularAria from "angular-aria";
import AngularMessages from "angular-messages";
import AngularCookies from "angular-cookies";
// import AngularMocks from "angular-mocks/ngMock";
import "angular-material/angular-material.css";
import "../css/main.css";

// console.log(AngularMocks);

angular
    .module("SwaggerGraphicalEditor", [
        // 'ui.materialize',
        angularMaterialize,
        "ngFileSaver",
        Common.name,
        Components.name,
        AngularMaterial,
        AngularAnimate,
        AngularAria,
        AngularMessages,
        // AngularMocks,
        AngularCookies
        // 'ngMaterial',
        // 'ngAnimate',
        // 'ngAria'
    ])

  .directive("app", appComponent);

console.warn(FileSaver);
