let swaggerhubService = ["$http", SwaggerHubService];

export default swaggerhubService;

/**
 */
function SwaggerHubService($http) {

    var shUri = "https://api.swaggerhub.com/apis",
    // var shUri = "https://localhost:8088/apis/hkmconsultingllc/Person/v1/swagger.json",
        apiData = null,
        publicApi,
        postConfig;

    postConfig = {
        headers: {
            "Authorization": null
        }
    };

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
        debugger;
        var uri = [shUri, postData.owner, postData.api].join("/");

        postConfig.headers.Authorization = apiKey;

        return $http.post(uri, postData.definition, postConfig)
                    .then(function(data) {
                        debugger;
                        console.warn("POST SUCCESS", data);
                    }, function(data) {
                        debugger;
                        console.warn("POST, ERROR", data);
                    });
    }

    /**
     */
    function getApiData() {
        return apiData;
    }
}
