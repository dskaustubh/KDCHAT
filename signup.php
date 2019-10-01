<?php
error_reporting(0);
require_once("db_connect.php");
$conn=$GLOBALS["conn"];
//Body of POST req start
$mob_no=$_POST["mobile_no"];
$password=$_POST["password"];
$user_name=$_POST["user_name"];
$hash=md5($password);
$file_name = $_FILES['file']['name'];
$file_tmp =$_FILES['file']['tmp_name'];
//body of post req ends

//response init start
$response=array();
$response["success"]=false;
$response["img_success"]=false;
$pro_pic_url="pro_pics/".$mob_no.$file_name;
//$response["trial"]=$file_name = $_FILES['file']['name'];

//response init end

$result = mysqli_query($conn,"INSERT INTO USERS (mobile_no ,password, user_name,pro_pic_url) 
                                        VALUES  ('$mob_no','$hash','$user_name','$pro_pic_url')");
if($result)
{
    $response["success"]=true;
    if(move_uploaded_file($file_tmp,$pro_pic_url))
    {
        $response["img_success"]=true;
    }
    
}
echo(json_encode($response));
?>