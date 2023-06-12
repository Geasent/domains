<?php

function getUsers($conn) {
    $users = mysqli_query($conn, 'SELECT * FROM `users`');

    $users_list = [];

    while($user = mysqli_fetch_assoc($users)) {
        $users_list[] = $user;
    }

    echo json_encode($users_list);
}

function getTasks($conn) {
    $tasks = mysqli_query($conn, 'SELECT * FROM `tasks`');

    $tasks_list = [];

    while($task = mysqli_fetch_assoc($tasks)) {
        $tasks_list[] = $task;
    }

    echo json_encode($tasks_list);
}

function getMessages($conn) {
    $messages = mysqli_query($conn, 'SELECT * FROM `messages`');

    $messages_list = [];

    while($message = mysqli_fetch_assoc($messages)) {
        $messages_list[] = $message;
    }

    echo json_encode($messages_list);
}

function getUser($conn, $id) {
    $user = mysqli_query($conn, "SELECT * FROM `users` WHERE `id` = '$id'");

    if(mysqli_num_rows($user) === 0) {
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "User not found"
        ];
        echo json_encode($res);
    }
    else {
        $user = mysqli_fetch_assoc($user);
        echo json_encode($user);
    }
}

function getTask($conn, $id) {
    $task = mysqli_query($conn, "SELECT * FROM `tasks` WHERE `id` = '$id'");

    if(mysqli_num_rows($task) === 0) {
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Task not found"
        ];
        echo json_encode($res);
    }
    else {
        $task = mysqli_fetch_assoc($task);
        echo json_encode($task);
    }
}

function getMessage($conn, $id) {
    $message = mysqli_query($conn, "SELECT * FROM `messages` WHERE `id` = '$id'");

    if(mysqli_num_rows($message) === 0) {
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Message not found"
        ];
        echo json_encode($res);
    }
    else {
        $message = mysqli_fetch_assoc($message);
        echo json_encode($message);
    }
}

function addUser($conn, $data) {

    $login = $data['login'];
    $pass = $data['pass'];
    $role = $data['role'];
    $full_name = $data['full_name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $date_of_birth = $data['date_of_birth'];
    $gender = $data['gender'];
    $position = $data['position'];

    mysqli_query($conn, "INSERT INTO `users` (`id`, `login`, `pass`, `role`, `full_name`, `email`, `phone`, `date_of_birth`, `gender`, `position`) VALUES (NULL, '$login', '$pass', '$role', '$full_name', '$email', '$phone', '$date_of_birth', '$gender', '$position')");

    http_response_code(201);
    $res = [
        "status" => true,
        "user_id" => mysqli_insert_id($conn)
    ];
    echo json_encode($res);

}

function addTask($conn, $data) {

    $name = $data['name'];
    $start_date = $data['start_date'];
    $end_date = $data['end_date'];
    $priority = $data['priority'];
    $description = $data['description'];
    $user_id = $data['user_id'];

    mysqli_query($conn, "INSERT INTO `tasks` (`id`, `name`, `start_date`, `end_date`, `priority`, `description`, `user_id`) VALUES (NULL, '$name', '$start_date', '$end_date', '$priority', '$description', '$user_id')");

    http_response_code(201);
    $res = [
        "status" => true,
        "task_id" => mysqli_insert_id($conn)
    ];
    echo json_encode($res);

}

function addMessage($conn, $data) {

    $user_id = $data['user_id'];
    $theme = $data['theme'];
    $message_text = $data['message_text'];
    $message_time = $data['message_time'];

    mysqli_query($conn, "INSERT INTO `messages` (`id`, `user_id`, `theme`, `message_text`, `message_time`) VALUES (NULL, '$user_id', '$theme', '$message_text', '$message_time')");

    http_response_code(201);
    $res = [
        "status" => true,
        "message_id" => mysqli_insert_id($conn)
    ];
    echo json_encode($res);

}

function updateUser($conn, $id, $data) {

    $login = $data['login'];
    $pass = $data['pass'];
    $role = $data['role'];
    $full_name = $data['full_name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $date_of_birth = $data['date_of_birth'];
    $gender = $data['gender'];
    $position = $data['position'];

    mysqli_query($conn, "UPDATE `users` SET `login` = '$login', `pass` = '$pass', `role` = '$role', `full_name` = '$full_name', `email` = '$email', `phone` = '$phone', `date_of_birth` = '$date_of_birth', `gender` = '$gender', `position` = '$position' WHERE `users`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated"
    ];
    echo json_encode($res);
}

function updateTask($conn, $id, $data) {

    $name = $data['name'];
    $start_date = $data['start_date'];
    $end_date = $data['end_date'];
    $priority = $data['priority'];
    $description = $data['description'];
    $user_id = $data['user_id'];

    mysqli_query($conn, "UPDATE `tasks` SET `name` = '$name', `start_date` = '$start_date', `end_date` = '$end_date', `priority` = '$priority', `description` = '$description', `user_id` = '$user_id' WHERE `tasks`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated"
    ];
    echo json_encode($res);
}
function updateMessage($conn, $id, $data) {

    $user_id = $data['user_id'];
    $theme = $data['theme'];
    $message_text = $data['message_text'];
    $message_time = $data['message_time'];

    mysqli_query($conn, "UPDATE `messages` SET `user_id` = '$user_id', `theme` = '$theme', `message_text` = '$message_text', `message_time` = '$message_time' WHERE `messages`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated"
    ];
    echo json_encode($res);
}

function deleteUser($conn, $id) {
    mysqli_query($conn, "DELETE FROM users WHERE `users`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Deleted"
    ];
    echo json_encode($res);
}

function deleteTask($conn, $id) {
    mysqli_query($conn, "DELETE FROM tasks WHERE `tasks`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Deleted"
    ];
    echo json_encode($res);
}

function deleteMessage($conn, $id) {
    mysqli_query($conn, "DELETE FROM messages WHERE `messages`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Deleted"
    ];
    echo json_encode($res);
}

function auth($conn, $data) {
    $login = $data['login'];
    $pass = $data['pass'];

    $user = mysqli_query($conn, "SELECT * FROM `users` WHERE `login` = '$login' AND `pass` = '$pass'");

    if(mysqli_num_rows($user) === 0) {
        $res_not_found = [
            "id" => 0
        ];
        echo json_encode($res_not_found);
    }
    else {
        $user = mysqli_fetch_assoc($user);
        $user_id = $user['id'];
        $full_name = $user['full_name'];
        $email = $user['email'];
        $phone = $user['phone'];
        $date_of_birth = $user['date_of_birth'];
        $gender = $user['gender'];
        $position = $user['position'];
        mysqli_query($conn, "INSERT INTO `session` (`id`, `user_id`, `full_name`, `email`, `phone`, `date_of_birth`, `gender`, `position`) VALUES (NULL, '$user_id', '$full_name', '$email', '$phone', '$date_of_birth', '$gender', '$position')");

        echo json_encode($user);
    }
}

function sessionClose($conn) {
    mysqli_query($conn, "DELETE FROM `session`");
}