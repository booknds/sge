import angular from 'angular';
import Header from './header/header';
import Footer from './footer/footer';
import Sidenav from './sidenav/sidenav';
import UniqueInput from './uniqueInput/uniqueInput';
import ModalCloser from './modalCloser/modalCloser';
import Focus from './focusOnClick/focusOnClick';
import TextField from './textInputField/textInputField';
import Dropdown from './dropdown/dropdown';
import TextArea from './textareaInput/textareaInput';

let CommonComponents =
  angular.module('common.components',
    [
      Header.name,
      Footer.name,
      Sidenav.name,
      UniqueInput.name,
      ModalCloser.name,
      Focus.name,
      TextField.name,
      Dropdown.name,
      TextArea.name
    ]);

export default CommonComponents;