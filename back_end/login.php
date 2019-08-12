<?php
error_reporting(0);
require_once("db_connect.php");
$conn=$GLOBALS["conn"];
//Body of POST req start
$mob_no=$_POST["mobile_no"];
$password=$_POST["password"];
$hash=md5($password);
//body of post req ends

//response init starts
$response=array();
$response["entry"]=false;
$response["user_name"]="";
$response["user_id"]="";
$response["pro_pic_url"]="";
//response init ends

$result = mysqli_query($conn,"SELECT * from users where mobile_no='$mob_no'");
while ($row = mysqli_fetch_array($result))
{
    if($row["password"]==$hash)
    {
        $response["entry"]=true;
        $response["user_name"]=$row["user_name"];
        $response["user_id"]=$row["user_id"];
        $response["mobile_no"]=$row["mobile_no"];
        $response["pro_pic_url"]=$row["pro_pic_url"];
    }
}
echo(json_encode($response));
?>