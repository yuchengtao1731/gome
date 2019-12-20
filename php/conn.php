<?php
//连接数据库
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','gome');
$con=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
//@符号：容错上面的错误，下面自定义了报错信息
if($con->conect_error){
    die('数据库连接失败:'.$con->connect_error);//die函数：输出括号里面的内容，并退出。
}