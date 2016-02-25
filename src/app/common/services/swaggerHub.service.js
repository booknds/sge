let swaggerhubService = ["$http", SwaggerHubService];

export default swaggerhubService;

/**
 */
function SwaggerHubService($http) {

    var shUri = "https://api.swaggerhub.com/apis",
        apiData = null,
        publicApi;

    publicApi = {
        getApi,
        getApiData
    };

    return publicApi;

    /**
    */
    function getApi(owner, api, version) {
        debugger;
        var uri = [shUri, owner, api, version].join("/");
        return $http.get(uri).
            then(function(data) {
                debugger;
                console.warn(data);
                apiData = data.data;
            }, function(data) {
                console.warn("ERROR", data);
            });
    }

    /**
     */
    function getApiData() {
        return apiData;
    }
}
