import Header from './header/header';
import Footer from './footer/footer';
// import Sidenav from './sidenav/sidenav';
import UniqueInput from './uniqueInput/uniqueInput';
// import ModalCloser from './modalCloser/modalCloser';
import Focus from './focusOnClick/focusOnClick';
import TextField from './textInputField/textInputField';
import Dropdown from './dropdown/dropdown';
import TextArea from './textareaInput/textareaInput';
import SchemaEditor from './schemaEditor/schemaEditor';
import FileUpload from './fileUpload/fileUpload';
import OperationColorer from './operationColorer/operationColorer';

export default angular
    .module('common.components', [
      Header.name,
      Footer.name,
      // Sidenav.name,
      UniqueInput.name,
      // ModalCloser.name,
      Focus.name,
      TextField.name,
      Dropdown.name,
      TextArea.name,
      SchemaEditor.name,
      FileUpload.name,
      OperationColorer.name,
    ]);

