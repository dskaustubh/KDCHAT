$(document).ready(function () {
    if (sessionStorage.getItem("entry")) {
        //if aldready logged in
        window.location = "homepage.html";
    }
    $("#log_btn").click(function () {
        $("#log_msg").html("");
        var mobile_no = $("#log_mob_no").val();
        var password = $("#log_password").val();
        if (mobile_no == "" || password == "") {
            $("#log_msg").html("Fill in all the fields");
        }
        else {
            var req = {
                "mobile_no": mobile_no,
                "password": password
            };
            $.post("login.php", req, function (res, status) {
                res = JSON.parse(res);
                var entry = res["entry"];
                if (entry) {
                    var user_name = res["user_name"];
                    var mobile_no = res["mobile_no"]
                    var user_id = res["user_id"];
                    var pro_pic_url = res["pro_pic_url"];
                    sessionStorage.setItem("entry", entry);
                    sessionStorage.setItem("user_id", user_id);
                    sessionStorage.setItem("mobile_no", mobile_no);
                    sessionStorage.setItem("user_name", user_name);
                    sessionStorage.setItem("pro_pic_url", pro_pic_url);
                    window.location = "homepage.html";
                }
                else {
                    $("#log_msg").html("Incorrect Mobile number or password");
                }

            });
        }

    });
});
