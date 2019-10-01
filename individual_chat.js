$(document).ready(function () {
    if (!sessionStorage.getItem("entry")) {
        //if not  logged in
        window.location = "login.html";
    }
    function getdata(){
        var data = {
            "mob_no": sessionStorage.getItem("mobile_no"),
            "other_mob_no":sessionStorage.getItem("other_mob_no")
        };
        $.post("individual_chat.php", data, function (res) {
                                
            res = JSON.parse(res);
            var c_head_img = res["img_url"];
            var c_u_name=res["user_name"];
            $("#chatheadername").html(c_u_name);
            $("#chatheader .text-center").html(data["other_mob_no"]);
            $("#chatheaderimg").attr("src", c_head_img);
            var bigbdy="";
            var chtbdy="";
            res["messages"].forEach(msgg => {
                var chtbdy="";
                if(msgg["sen_mob_no"]==data["mob_no"]){
                    chtbdy=' <div class="container text-right bg-info text-white border border-white mb-2" >'+
                    ' <p>'+msgg["message"]+'</p>'+
                    '<img class="img-fluid p-0" src=' +msgg["img_url"] + '>'+
                    '</div>';     
                }
                else{
                    chtbdy=' <div class="container align-left bg-primary text-white border border-white mb-2" >'+
                    ' <p>'+msgg["message"]+'</p>'+
                    '<img class="img-fluid p-0" src=' +msgg["img_url"] + '>'+
                    '</div>';   
                }
                //$("#chatbody").append(chtbdy);
                bigbdy+=chtbdy;
                console.log(bigbdy);
            });

            $("#chatbody").html(bigbdy);
    
        });

    }
    $("#snd_err").html("");

    getdata();

    $("#snd_btn").click(function(){
        var data = {
            "mob_no": sessionStorage.getItem("mobile_no"),
            "other_mob_no":sessionStorage.getItem("other_mob_no")
        };
        var msg=$("#snd_msg").val();
        var file_data = $('#file').prop('files')[0];
        if(msg || file_data){
            var form_data = new FormData();
            form_data.append('file', file_data);
            form_data.append('message', msg);
            form_data.append('m_type', '1');
            form_data.append('sen_mob_no',data["mob_no"]);
            form_data.append('rec_mob_no',data["other_mob_no"]);

            $.ajax({
                url: 'sendmessage.php',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (obj) {
                    //console.log(obj["success"]);
                    if(obj["success"]){

                        $("#snd_err").html("Message Sent");
                        $("#snd_msg").val("");
                        getdata();
                        //$("#chatbody").html("");
                        setTimeout(function(){
                            $("#snd_err").html("");

                        }, 2000);
                        
                    }
                    else{
                        $("#snd_err").html("Message cant be sent");

                    }
                }
            });
            
        }

        else{
            $("#snd_err").html("Message cant be empty");
        }
    });



});