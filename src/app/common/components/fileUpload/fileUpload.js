import FileUploadComponent from "./fileUpload.component";

export default angular
    .module("FileUploadModule", [])
    .directive("customOnChange", FileUploadComponent);

// export default FileUploadModule;
