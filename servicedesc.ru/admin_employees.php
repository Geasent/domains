<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employees</title>
    <link href="bootstrap/bootstrap.css" rel="stylesheet">
    <link href="main.css" rel="stylesheet">
    <style>
        body {background-color: #303030}
    </style>
</head>
<body onload="getEmployess()">
<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="admin_main.php">Bozika</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="admin_tasks.php">Задачи</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="admin_employees.html">Сотрудники</a>
                </li>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body" style="background-color: #303030">
                    <form style="background-color: #303030">
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="login" class="form-label">Логин</label>
                            <input type="text" class="form-control" id="login" aria-describedby="emailHelp" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="pass" class="form-label">Пароль</label>
                            <input type="password" class="form-control" id="pass" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="confirm_pass" class="form-label">Подтвердите пароль</label>
                            <input type="password" class="form-control" id="confirm_pass" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="role" class="form-label">Ваша роль в организации</label>
                            <input type="text" class="form-control" id="role" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="full_name" class="form-label">Ваше ФИО</label>
                            <input type="text" class="form-control" id="full_name" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="email" class="form-label">Ваш Email</label>
                            <input type="text" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="phone" class="form-label">Ваш телефон</label>
                            <input type="text" class="form-control" id="phone" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="gender" class="form-label">Ваш пол</label>
                            <input type="text" class="form-control" id="gender" required>
                        </div>
                        <div class="mb-3">
                            <label style="color: #eaeaea" for="position" class="form-label">Ваша должность</label>
                            <input type="text" class="form-control" id="position" required>
                        </div>
                        <button style="margin-bottom: 5px; color: #eaeaea" type="button" onclick="addUser()" class="btn btn-danger">Создать</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <label style="color: #eaeaea" for="admin-new-tasks" class="form-label">Сотрудники</label>
    <div class="row" style="align-content: center">
        <div class="col">
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Создать</button>
        </div>
    </div>
    <div class="row" id="admin-new-tasks" style="align-content: center">
        <div class="card-group employees-card"></div>
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