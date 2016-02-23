/**
 */
export default function UtilitiesServ() {

    /**
     */
    function toast(message) {
        Materialize.toast(message, 3000);
    }

    return {
        toast
    };
}
