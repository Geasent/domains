<?php

include 'config/connect.php';
global $conn;

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<style>
    th, td {
        padding: 10px;
    }

    th {
        background: #606060;
        color: #fff;
    }

    td {
        background: #b5b5b5;
    }

</style>
<body>
    <table>
        <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Price</th>
        </tr>
        <?php

        $users = mysqli_query($conn, "SELECT * FROM `users`");
        $users = mysqli_fetch_all($users);
        foreach ($users as $user){
            ?>
            <tr>
                <td><?= $user[0] ?></td>
                <td><?= $user[1] ?></td>
                <td><?= $user[2] ?></td>
                <td><a href="update.php?id=<?= $user[0] ?>">Update</a></td>
                <td><a style="color: #a52834" href="functions/delete.php?id=<?= $user[0] ?>">Delete</a></td>
            </tr>
            <?php
        }

        ?>
    </table>
    <h3>New user</h3>
    <form action="functions/add.php" method="POST">
        <p>Email</p>
        <input type="text" name="email">
        <p>Password</p>
        <input type="text" name="pass">
        <button type="submit">add new user</button>
    </form>
</body>
</html>