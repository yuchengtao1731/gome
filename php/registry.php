<?php
require('conn.php');
if(isset($_POST['submit'])){//isset():判断括号里面的值是否存在。
    $username=$_POST['username'];
    $password=sha1($_POST['password']);
    $email=$_POST['email'];
    $tel=$_POST['tel'];
    $con->query("insert userinfo values(null,'$username','$email','$password','$tel',NOW())");
     header('location:http://10.31.161.151/erjieduan/gome/src/login.html');
}


if(isset($_POST['username'])){
    $username=$_POST['username'];
    $result= $con->query(" select * from userinfo where username = '$username'");
    if($result->fetch_assoc()){//存在，用户名已经存在
        echo true;
    }else{
        echo false;
    }
}

