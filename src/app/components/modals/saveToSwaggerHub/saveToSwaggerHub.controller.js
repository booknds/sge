let saveToSwaggerHub = ["$cookies", "$mdDialog", "SwaggerHub", "CompilerService", SaveFileToSwaggerHubController];

export default saveToSwaggerHub;

/**
 */
function SaveFileToSwaggerHubController($cookies, $mdDialog, SwaggerHub, CompilerService) {

    this.apiKey = initApiKey();
    this.postData = resetData();

    var apiKey = "eyJUb2tlblR5cGUiOiJBUEkiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyZGY5MmVkMy1kM2U2LTRkNTYtYmI1Zi1hNTI1NTNjOTczY2YiLCJpYXQiOjE0NDQwOTM5MTB9.t2mKwVWDzw30dkDARjJUu2HOsaZtFXnpG29NZZjmA1fyjR4CgKmqvNCihQr6WKJGGuD1RmzD05bbHw-8F9cPTQ";

    //

    this.save = function saveToSH() {
        CompilerService.recompile();
        var compiled = CompilerService.compiled;
        if (Object.keys(compiled).length === 0) {
            return;
        }

        debugger;

        // this.postData.definition = compiled;

        this.postData.definition = angular.toJson(compiled);
        // this.postData.definition.splice(0, 1);
        // this.postData.definition.splice(this.postData.definition.length - 1, 1);

        SwaggerHub.postApi(this.postData, apiKey)
                    .then(function(data) {
                        debugger;
                        console.warn(data);
                        saveApiKey(apiKey);
                        $mdDialog.hide("saved!");
                    }, function() {
                        debugger;
                    });

        // $mdDialog.hide("saved!");
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function initApiKey() {
        debugger;
        return $cookies.get("apiKey");
    }

    /**
     */
    function saveApiKey(value) {
        debugger;
        var todaysDate = Date();
        var expirationDate = new Date(todaysDate);
        expirationDate.setHours(todaysDate.getHours() + 1);

        $cookies.put("apiKey", value, { expires: expirationDate });
    }

    /**
     */
    function resetData() {
        return {
            owner: "hkmconsultingllc",
            api: "Person",
            definition: "key"
        };
    }


}
