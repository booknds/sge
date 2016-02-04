let utilities = [utilitiesServ];

export default utilities;

function utilitiesServ(){

    function toast(message){
        Materialize.toast(message, 3000);
    }

    return {
        toast
    };

}