<?php

function getUsers($conn) {
    $users = mysqli_query($conn, "SELECT * FROM `users` WHERE `role` <> '1'");

    $users_list = [];

    while($user = mysqli_fetch_assoc($users)) {
        $users_list[] = $user;
    }

    echo json_encode($users_list);
}

function getAdminUsers($conn) {
    $users = mysqli_query($conn, "SELECT * FROM `users` WHERE `role` = '1'");

    $users_list = [];

    while($user = mysqli_fetch_assoc($users)) {
        $users_list[] = $user;
    }

    echo json_encode($users_list);
}

function getTasks($conn) {
    $tasks = mysqli_query($conn, "SELECT `tasks`.`id`, `name`, `priority`, `description`, `executor_user_id`, `customer_user_id`, `status`, `full_name`, `users`.`role` FROM `tasks` LEFT JOIN `users` ON `tasks`.`executor_user_id` = `users`.`id`");

    $tasks_list = [];

    while($task = mysqli_fetch_assoc($tasks)) {
        $tasks_list[] = $task;
    }

    echo json_encode($tasks_list);
}

function getTasksById($conn, $data) {
    $id = $data['id'];

    $tasks = mysqli_query($conn, "SELECT `tasks`.`id`, `name`, `priority`, `description`, `executor_user_id`, `customer_user_id`, `status`, `full_name`, `users`.`role` FROM `tasks` LEFT JOIN `users` ON `tasks`.`executor_user_id` = `users`.`id` WHERE `tasks`.`executor_user_id` = '$id'");

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

function getSession($conn) {
    $sessionInf = mysqli_query($conn, "SELECT * FROM `session`");

    $session_list = [];

    while($session = mysqli_fetch_assoc($sessionInf)) {
        $session_list[] = $session;
    }

    echo json_encode($session_list);
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

function getMessagesById($conn, $data) {
    $customer_id = $data['customer_id'];

    $messages = mysqli_query($conn, "SELECT * FROM `messages` WHERE `customer_id` = '$customer_id' ORDER BY `id` DESC");

    $messages_list = [];

    while($message = mysqli_fetch_assoc($messages)) {
        $messages_list[] = $message;
    }

    echo json_encode($messages_list);
}

function addUser($conn, $data) {

    $login = $data['login'];
    $pass = $data['pass'];
    $role = $data['role'];
    $full_name = $data['full_name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $gender = $data['gender'];
    $position = $data['position'];

    $unigueUser = mysqli_query($conn, "SELECT * FROM `users` WHERE `login` = '$login'");

    if(mysqli_num_rows($unigueUser) === 0) {

        mysqli_query($conn, "INSERT INTO `users` (`id`, `login`, `pass`, `role`, `full_name`, `email`, `phone`, `gender`, `position`) VALUES (NULL, '$login', '$pass', '$role', '$full_name', '$email', '$phone', '$gender', '$position')");

        http_response_code(201);
        $res = [
            "status" => true,
            "user_id" => mysqli_insert_id($conn)
        ];
        echo json_encode($res);       
    }
    else {
        $res_not_unique = [
            "user_id" => 0
        ];
        echo json_encode($res_not_unique);
    }

}

function addTask($conn, $data) {

    $name = $data['name'];
    $priority = $data['priority'];
    $description = $data['description'];
    $status = $data['status'];
    $executor_user_id = $data['executor_user_id'];
    $customer_user_id = $data['customer_user_id'];

    mysqli_query($conn, "INSERT INTO `tasks` (`id`, `name`, `priority`, `description`,`status`, `executor_user_id`, `customer_user_id`) VALUES (NULL, '$name', '$priority', '$description', '$status', '$executor_user_id', '$customer_user_id')");

    http_response_code(201);
    $res = [
        "status" => true,
        "task_id" => mysqli_insert_id($conn)
    ];
    echo json_encode($res);

}

function addMessage($conn, $data) {

    $task_id = $data['task_id'];
    $customer_id = $data['customer_id'];
    $theme = $data['theme'];
    $message_text = $data['message_text'];

    mysqli_query($conn, "INSERT INTO `messages` (`id`, task_id, `customer_id`, `theme`, `message_text`) VALUES (NULL, '$task_id', '$customer_id', '$theme', '$message_text')");

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
    $gender = $data['gender'];
    $position = $data['position'];

    mysqli_query($conn, "UPDATE `users` SET `login` = '$login', `pass` = '$pass', `role` = '$role', `full_name` = '$full_name', `email` = '$email', `phone` = '$phone', `gender` = '$gender', `position` = '$position' WHERE `users`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated"
    ];
    echo json_encode($res);
}

function updateTask($conn, $id, $data) {

    $name = $data['name'];
    $priority = $data['priority'];
    $description = $data['description'];
    $user_id = $data['user_id'];

    mysqli_query($conn, "UPDATE `tasks` SET `name` = '$name', `priority` = '$priority', `description` = '$description', `user_id` = '$user_id' WHERE `tasks`.`id` = '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated"
    ];
    echo json_encode($res);
}

function updateTaskStatus($conn, $data) {

    $status = $data['status'];
    $id = $data['id'];
    $executor_id = $data['executor_id'];

    mysqli_query($conn, "UPDATE `tasks` SET `status` = '$status', `executor_user_id` = '$executor_id' WHERE `tasks`.`id` = '$id'");

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
        $role = $user['role'];
        $user_id = $user['id'];
        $full_name = $user['full_name'];
        $email = $user['email'];
        $phone = $user['phone'];
        $gender = $user['gender'];
        $position = $user['position'];
        mysqli_query($conn, "INSERT INTO `session` (`id`, `user_id`, `full_name`, `email`, `phone`, `gender`, `position`, `role`) VALUES (NULL, '$user_id', '$full_name', '$email', '$phone', '$gender', '$position', '$role')");

        echo json_encode($user);
    }
}

function sessionClose($conn) {
    mysqli_query($conn, "DELETE FROM `session`");
}