/**
 */
export default function UtilitiesServ() {

    var publicApi = {
        toast
    };

    return publicApi;

    /**
     */
    function toast(message) {
        Materialize.toast(message, 3000);
    }

}
