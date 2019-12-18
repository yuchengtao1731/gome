<?php
require('conn.php');
if(isset($_POST['submit'])){//isset():判断括号里面的值是否存在。
    $username=$_POST['username'];
    $password=sha1($_POST['password']);
    $email=$_POST['email'];
    $tel=$_POST['tel'];
    $con->query("insert userinfo values(null,'$username','$email','$password','$tel',NOW())");
}else{
    exit('非法操作');//exit:退出并输出括号里面的值
}






