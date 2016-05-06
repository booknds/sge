import HeaderNav from './HeaderNav/HeaderNav';
import Main from './Main/Main';
import InfoView from './InfoView/InfoView';

export default angular
  .module('app.components', [
    HeaderNav.name,
    Main.name,
    InfoView.name,
  ]);

