<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Executer</title>
    <link href="bootstrap/bootstrap.css" rel="stylesheet">
    <link href="main.css" rel="stylesheet">
    <style>
        body {background-color: #303030}
    </style>
</head>
<body onload="getTasksById(); getNewTasks()">
<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="executor_main.html">Bozika</a>
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
<div class="container text-center"  id="admin_main">
    <div class="row">
        <div class="col">
            <label style="color: #eaeaea" for="new-tasks" class="form-label">Новые</label>
            <div id="new-tasks" class="col task-list-new"></div>
        </div>
        <div class="col">
            <label style="color: #eaeaea" for="success-tasks" class="form-label">Принятые</label>
            <div id="success-tasks" class="col task-list-success"></div>
        </div>
        <div class="col">
            <label style="color: #eaeaea" for="process-tasks" class="form-label">В работе</label>
            <div id="process-tasks" class="col task-list-process"></div>
        </div>
        <div class="col">
            <label style="color: #eaeaea" for="complete-tasks" class="form-label">Выполненные</label>
            <div id="complete-tasks" class="col task-list-complete"></div>
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
                    <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="bootstrap/bootstrap.bundle.js"></script>
<script src="main.js"></script>
</body>
</html>