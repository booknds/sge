import angular from 'angular';
import Header from './header/header';
import Footer from './footer/footer';
import UniqueInput from './uniqueInput/uniqueInput';
import ModalCloser from './modalCloser/modalCloser';
import Focus from './focusOnClick/focusOnClick';

let CommonComponents =
  angular.module('common.components',
    [
      Header.name,
      Footer.name,
      UniqueInput.name,
      ModalCloser.name,
      Focus.name
    ]);

export default CommonComponents;
