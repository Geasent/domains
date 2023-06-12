<?php

global $conn;
require 'config/connect.php';


$user_id = $_GET['id'];
$user = mysqli_query($conn, "SELECT * FROM `users` WHERE `id` = '$user_id'");
$user = mysqli_fetch_assoc($user);
print_r($user);

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="functions/update.php" method="POST">
    <input type="hidden" name="id" value="<?= $user['id'] ?>">
    <p>Email</p>
    <input type="text" name="email" value="<?= $user['email'] ?>">
    <p>Password</p>
    <input type="text" name="pass" value="<?= $user['pass'] ?>">
    <button type="submit">Update user</button>
</form>
</body>
</html>
