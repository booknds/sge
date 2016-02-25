let openFromSH = ["SwaggerHub", "CompilerService", "$mdDialog", OpenFromSwaggerHub];

export default openFromSH;

/**
 */
function OpenFromSwaggerHub(SwaggerHub, CompilerService, $mdDialog) {

    this.swaggerData = resetData();

    var swaggerDefinition;

    this.open = function open(owner, api, version) {
        debugger;
        SwaggerHub.getApi(owner, api, version)
            .then(function() {
                debugger;
                swaggerDefinition = SwaggerHub.getApiData();
                if (swaggerDefinition) {
                    CompilerService.distributeImportedDefinitionToServices(swaggerDefinition);
                    $mdDialog.hide();
                }
            }, function() {
                console.warn("Error!!!");
            });
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function resetData() {
        return {
            owner: "hkmconsultingllc",
            api: "Person",
            version: "v1"
        };
    }


}
