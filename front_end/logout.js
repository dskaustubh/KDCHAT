$(document).ready(function(){
    $("#logout").on("click",function(){

        // sessionStorage.removeItem("entry");
        // sessionStorage.removeItem("user_id");
        // sessionStorage.removeItem("mobile_no");
        // sessionStorage.removeItem("user_name");
        sessionStorage.clear();

        window.location = "login.html";
    });
});