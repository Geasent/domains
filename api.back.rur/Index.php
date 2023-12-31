<?php

 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: *');
 header('Access-Control-Allow-Methods: *');
 header('Access-Control-Allow-Credentials: true');
 header('Content-type: json/application');

 

 global $conn;
 require 'connect.php';
 require 'functions.php';

 $method = $_SERVER['REQUEST_METHOD'];
 $q = $_GET['q'];
 $params = explode('/', $q);
 $type = $params[0];
 if(isset($params[1])){
     $id = $params[1];
 }

 switch ($method) {
     case 'GET':
         if ($type === 'users') {

             if(isset($id)) {
                 getUser($conn, $id);
             }
             else {
                 getUsers($conn);
             }
         }
         if ($type === 'adminUsers') {
             getAdminUsers($conn);
         }
         if ($type === 'tasks') {

             if(isset($id)) {
                 getTask($conn, $id);
             }
             else {
                 getTasks($conn);
             }
         }
         if ($type === 'messages') {

             if(isset($id)) {
                 getMessage($conn, $id);
             }
             else {
                 getMessages($conn);
             }
         }
         if ($type === 'session') {
             getSession($conn);
         }
         break;
     case 'POST':
         if ($type === 'users') {
             addUser($conn, $_POST);
         }
         if ($type === 'tasks') {
             addTask($conn, $_POST);
         }
         if ($type === 'messages') {
             addMessage($conn, $_POST);
         }
         if ($type === 'tasksById') {
             getTasksById($conn, $_POST);
         }
         if ($type === 'messagesById') {
             getMessagesById($conn, $_POST);
         }
         break;
     case 'PATCH':
         if ($type === 'users') {
             if(isset($id)) {
                 $data = file_get_contents('php://input');
                 $data = json_decode($data, true);
                 updateUser($conn, $id, $data);
             }
         }
         if ($type === 'tasks') {
             if(isset($id)) {
                 $data = file_get_contents('php://input');
                 $data = json_decode($data, true);
                 updateTask($conn, $id, $data);
             }
         }
         if ($type === 'messages') {
             if(isset($id)) {
                 $data = file_get_contents('php://input');
                 $data = json_decode($data, true);
                 updateMessage($conn, $id, $data);
             }
         }
         if ($type === 'taskStatus') {
                 $data = file_get_contents('php://input');
                 $data = json_decode($data, true);
                 updateTaskStatus($conn, $data);
         }
         break;
     case 'DELETE':
         if ($type === 'users') {
             if(isset($id)) {
                 deleteUser($conn,$id);
             }
         }
         if ($type === 'tasks') {
             if(isset($id)) {
                 deleteTask($conn,$id);
             }
         }
         if ($type === 'messages') {
             if(isset($id)) {
                 deleteMessage($conn,$id);
             }
         }
         break;
 }

 if ($type === 'auth') {
     auth($conn, $_POST);
 }

 if ($type === 'sessionClose') {
     sessionClose($conn);
 }
