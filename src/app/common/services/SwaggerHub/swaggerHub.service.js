let swaggerHubService = ["$http", SwaggerHubService];

export default swaggerHubService;

/**
 */
function SwaggerHubService($http) {

    var shUri = "https://api.swaggerhub.com/apis",
    // var shUri = "https://localhost:8088/apis/hkmconsultingllc/Person/v1/swagger.json",
        apiData = null,
        publicApi;
        // postConfig;

    // postConfig = {
    //    headers: {
    //        "Authorization": "eyJUb2tlblR5cGUiOiJBUEkiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyZGY5MmVkMy1kM2U2LTRkNTYtYmI1Zi1hNTI1NTNjOTczY2YiLCJpYXQiOjE0NDQwOTM5MTB9.t2mKwVWDzw30dkDARjJUu2HOsaZtFXnpG29NZZjmA1fyjR4CgKmqvNCihQr6WKJGGuD1RmzD05bbHw-8F9cPTQ"
    //    }
    // };

    publicApi = {
        getApi,
        postApi,
        getApiData
    };

    return publicApi;

    /**
    */
    function getApi(owner, api, version) {
        debugger;
        var uri = [shUri, owner, api, version].join("/");
        return $http.get(uri)
                    .then(function(data) {
                        debugger;
                        console.warn(data);
                        apiData = data.data;
                    }, function(data) {
                        console.warn("ERROR", data);
                    });
    }

    /**
     */
    function postApi(postData, apiKey) {

        var uri = [shUri, postData.owner, postData.api].join("/");
        console.warn(apiKey);
        // postConfig.headers.Authorization = apiKey;
        debugger;

        return $http({
            url: uri,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "Accept": "text/html"
            },
            data: postData.definition
        }).then(function(data) {
            debugger;
            console.warn("POST SUCCESS", data);
        }, function(data) {
            debugger;
            console.warn("POST, ERROR", data);
        });
        // return $http.post(uri, postData.definition, postConfig)
        //            .then(function(data) {
        //                debugger;
        //                console.warn("POST SUCCESS", data);
        //            }, function(data) {
        //                debugger;
        //                console.warn("POST, ERROR", data);
        //            });
    }

    /**
     *
     */
    function getApiData() {
        return apiData;
    }
}
