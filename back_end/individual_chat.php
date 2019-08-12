<?php
error_reporting(0);
require_once("db_connect.php");
$conn=$GLOBALS["conn"];
//Body of POST req start
$other_mob_no=$_POST["other_mob_no"];
$mob_no=$_POST["mob_no"];
//body of post req ends

//init start
$response=array();
$response["messages"]=array();
$response["img_url"]="";
$response["user_name"]="";
//init end
$result=mysqli_query($conn,"select * from messages where sen_mob_no='$mob_no' and rec_mob_no='$other_mob_no' or 
                            rec_mob_no='$mob_no' and sen_mob_no='$other_mob_no' order by time_stamp asc");
while($row=mysqli_fetch_array($result))
{
    array_push($response["messages"],$row);
}
$result=mysqli_query($conn,"select pro_pic_url,user_name from users where mobile_no='$other_mob_no'");
while($row=mysqli_fetch_array($result))
{
    $response["img_url"]=$row["pro_pic_url"];
    $response["user_name"]=$row["user_name"];
}


echo(json_encode($response));
?>