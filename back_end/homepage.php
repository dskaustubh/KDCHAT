<?php
//error_reporting(0);
require_once("db_connect.php");
$conn=$GLOBALS["conn"];
//post body staart
$mob_no=$_POST["mobile_no"];
// post body end

//init start
$response=array();
// init end 
/*
$res=mysqli_query($conn,"select * from messages where sen_mob_no='$mob_no' or rec_mob_no='$mob_no' order by time_stamp ASC");
while($row = mysqli_fetch_array($res)){
    $obj=array();
    $obj["rec_mob_no"]=$row["rec_mob_no"];
    $obj["sen_mob_no"]=$row["sen_mob_no"];
    $obj["m_type"]=$row["m_type"];
    $obj["message"]=$row["message"];
    $obj["img_url"]=$row["img_url"];
    $obj["time_stamp"]=$row["time_stamp"];
    array_push($response,$obj);
}
*/
$result=mysqli_query($conn,"select * from users where NOT mobile_no='$mob_no'");
while ($row = mysqli_fetch_array($result)){
    $obj=array();
    $obj["mobile_no"]=$row["mobile_no"];
    $obj["pro_pic_url"]=$row["pro_pic_url"];
    $obj["user_name"]=$row["user_name"];
    array_push($response,$obj);
}
echo(json_encode($response));
?>