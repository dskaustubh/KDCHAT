$(document).ready(function () {
    $("#sup_btn").click(function () {
        $("#sup_msg").html(" ");

        var mobile_no = $("#sup_mob_no").val();
        var pass1 = $("#sup_pass1").val();
        var pass2 = $("#sup_pass2").val();
        var password = pass1;
        var user_name = $("#sup_name").val();
        var file_data = $('#file').prop('files')[0];
        if (mobile_no == "" || pass1 == "" || pass2 == "" || user_name == "") {
            $("#sup_msg").html("Please Fill in All the Fields");

        }
        else {
            var form_data = new FormData();
            form_data.append('file', file_data);
            form_data.append('mobile_no', mobile_no);
            form_data.append('password', password);
            form_data.append('user_name', user_name);
            /*
            $.post("signup.php", form_data, function (res, status) {
                alert(res);
            });
            */

            $.ajax({
                url: 'signup.php',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (obj) {
                    //console.log(obj["success"]);
                    if(obj["success"]){

                        $("#sup_msg").html("Sign Up Successful please Login");
                        setTimeout(function(){
                            window.location = "login.html";
                        }, 5000);
                        
                    }
                    else{
                        $("#sup_msg").html("Sign Up Unsuccessful");

                    }
                }
            });

        }


    });



});