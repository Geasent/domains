<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Customer</title>
    <link href="bootstrap/bootstrap.css" rel="stylesheet">
    <link href="main.css" rel="stylesheet">
    <style>
        body {background-color: #303030}
    </style>
</head>
<body onload="getMessageById(); getCustomerTasksById()">
<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="customer_main.html">Bozika</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Профиль
                </a>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModalProfile">Профиль</a></li>
                    <li><a class="dropdown-item" onclick="exit()" href="#">Выйти</a></li>
                </ul>
            </div>
        </div>
    </div>
</nav>
<div class="container text-center">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel1">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="Name" class="form-label">Название</label>
                            <input type="text" class="form-control" id="name" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="Priority" class="form-label">Приоритет</label>
                            <input type="text" class="form-control" id="priority">
                        </div>
                        <div class="mb-3">
                            <label for="Description" class="form-label">Описание</label>
                            <input type="text" class="form-control" id="description">
                        </div>
                        <button type="button" onclick="addTask()" class="btn btn-primary">Создать</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="align-content: center">
        <div id="customer-add-task" class="col task-list-new" style="margin: auto; margin-top: 0px">
            <div class="row" style="align-content: center">
                <label style="color: #eaeaea" for="customer-add-task" class="form-label">Появилась проблема?</label>
            </div>
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Создать задачу</button>
                <div class="row">
                    <div class="col">
                        <label style="color: #eaeaea" for="new-tasks" class="form-label">Ваши задачи</label>
                        <div id="new-tasks" class="col customer-task-list"></div>
                    </div>
            </div>
        </div>
        <div id="customer-messages" class="col message-list" style="margin: auto; margin-top: 0px ">
            <div class="row" style="align-content: center">
                <label style="color: #eaeaea" for="customer-add-task" class="form-label">Ваши сообщения</label>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="exampleModalProfile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color: #303030">
            <div class="modal-header">
                <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">Ваш профиль</h1>
            </div>
            <div class="modal-body"  style="color: white">
                <div class="container-fluid Profile">

                </div>
                <div class="modal-footer">
                    <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="bootstrap/bootstrap.bundle.js"></script>
<script src="main.js"></script>
</body>
</html>