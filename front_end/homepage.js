$(document).ready(function () {
    if (!sessionStorage.getItem("entry")) {
        //if not  logged in
        window.location = "login.html";
    }
    var pro_pic_url = sessionStorage.getItem("pro_pic_url");
    var user_name = sessionStorage.getItem("user_name");
    var mobile_no = sessionStorage.getItem("mobile_no");
    $("#pro_pic").attr("src", pro_pic_url);
    $("#user_details").html(" " + user_name + "<br> " + mobile_no);
    $.post("homepage.php", { "mobile_no": mobile_no }, function (res) {
        res = JSON.parse(res);
        res.forEach(user => {

            msg = '<div class="container  border border-primary row" id='+ user['mobile_no']+'>'
            +'<img class="img-fluid rounded-circle col-sm-2" src=' + user["pro_pic_url"] + '>'+'<p class="col-sm-7"></p>'
            +'<div class="text-right col-sm-3">'
            +'<p class="mt-3 mb-0">'+ user["user_name"] +'</p>'
            +'<p class="mt-1 mb-0">'+ user["mobile_no"] +'</p>'
            + '</div>'
            + '</div>';
            $("#allusers").append(msg);

        });
       
        
    });
    $("#allusers").on("click","div",function(){
        var other_mob_no =$(this).attr('id');
        sessionStorage.setItem("other_mob_no",other_mob_no);
        window.location = "individual_chat.html";

    });
});
