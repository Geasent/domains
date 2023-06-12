<?php

require '../config/connect.php';
global $conn;

$id = $_POST['id'];
$email = $_POST['email'];
$pass = $_POST['pass'];

mysqli_query($conn, "UPDATE `users` SET `email` = '$email', `pass` = '$pass' WHERE `users`.`id` = '$id'");

header('Location: /');