let saveToSwaggerHub = ["$cookies", "$mdDialog", "SwaggerHub", "CompilerService", SaveFileToSwaggerHubController];

export default saveToSwaggerHub;

/**
 */
function SaveFileToSwaggerHubController($cookies, $mdDialog, SwaggerHub, CompilerService) {

    this.apiKey = initApiKey();
    this.postData = resetData();

    // var apiKey = "eyJUb2tlblR5cGUiOiJBUEkiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyZGY5MmVkMy1kM2U2LTRkNTYtYmI1Zi1hNTI1NTNjOTczY2YiLCJpYXQiOjE0NDQwOTM5MTB9.t2mKwVWDzw30dkDARjJUu2HOsaZtFXnpG29NZZjmA1fyjR4CgKmqvNCihQr6WKJGGuD1RmzD05bbHw-8F9cPTQ";

    this.save = function saveToSH() {
        CompilerService.recompile();
        var compiled = CompilerService.compiled;
        if (Object.keys(compiled).length === 0) {
            return;
        }

        debugger;

        this.postData.definition = angular.toJson(compiled);

        SwaggerHub.postApi(this.postData, this.apiKey)
                    .then(function(data) {
                        debugger;
                        console.warn(data);
                        saveApiKey(this.apiKey);
                        $mdDialog.hide("saved!");
                    }.bind(this), function() {
                        console.warn("post error");
                    });

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function initApiKey() {
        return $cookies.get("apiKey");
    }

    /**
     */
    function saveApiKey(value) {

        if ($cookies.get("apiKey") !== value) {
            let todaysDate = new Date();
            let expirationDate = new Date(todaysDate);
            expirationDate.setHours(todaysDate.getHours() + 1);

            $cookies.put("apiKey", value, { expires: expirationDate });
        }

    }

    /**
     */
    function resetData() {
        return {
            owner: "",
            api: "",
            definition: ""
        };
    }


}
