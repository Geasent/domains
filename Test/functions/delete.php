<?php

require '../config/connect.php';
global $conn;

$id = $_GET['id'];

mysqli_query($conn, "DELETE FROM users WHERE `users`.`id` = '$id'");

header('Location: /');