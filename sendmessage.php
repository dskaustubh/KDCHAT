<?php
error_reporting(0);
require_once("db_connect.php");
$conn=$GLOBALS["conn"];

//body of post req starts
$rec_mob_no=$_POST["rec_mob_no"];
$sen_mob_no=$_POST["sen_mob_no"];
$m_type= $_POST["m_type"];
$message =$_POST["message"];
//$img_url=$_POST["img_url"];
//body of post req ends

//init starts
$response=array();
$response["success"]=false;
$response["img_success"]=false;
$target="imgs/";
$file_name = $_FILES['file']['name'];
$file_tmp =$_FILES['file']['tmp_name'];
if(!$file_name){
    $m_type=0;
}
$target=$target.$file_name;
$img_url=$target;
if($m_type==0)
{
    $img_url="";
}

//init ends

$result=mysqli_query($conn,"insert into messages (rec_mob_no,sen_mob_no,m_type,message,img_url)
                                         values   ('$rec_mob_no','$sen_mob_no','$m_type','$message','$img_url')");
                
if($result)
{
    if($m_type==1){

 
        if(move_uploaded_file($file_tmp,$target))
        {
            $response["img_success"]=true;
        }
    }
    $response["success"]=true;

}
echo(json_encode($response));

?>