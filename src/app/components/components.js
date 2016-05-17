import HeaderNav from './HeaderNav/HeaderNav';
import Main from './Main/Main';
import InfoView from './InfoView/InfoView';
import InfoEdit from './InfoEdit/InfoEdit';
import InfoContainer from './InfoContainer/InfoContainer';
import PathViewMin from './PathViewMin/PathViewMin';
import PathViewMax from './PathViewMax/PathViewMax';
import PathContainer from './PathContainer/PathContainer';

export default angular
  .module('app.components', [
    HeaderNav.name,
    Main.name,
    InfoView.name,
    InfoEdit.name,
    InfoContainer.name,
    PathViewMin.name,
    PathViewMax.name,
    PathContainer.name,
  ]);

