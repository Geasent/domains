<?php
global $conn;

require '../config/connect.php';

$email = $_POST['email'];
$pass = $_POST['pass'];

mysqli_query($conn, "INSERT INTO `users` (`id`, `email`, `pass`) VALUES (NULL, '$email', '$pass')");

header('Location: /');