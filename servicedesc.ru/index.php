<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Service desc</title>
    <link href="main.css" rel="stylesheet">
    <link href="bootstrap/bootstrap.css" rel="stylesheet">
    <style>
        body {background-color: #303030}
    </style>
</head>
<body style="height: 100%">
<div class="container" id="auth_container" style="width: 25%">
    <form style="margin-top: 30vh">
        <div class="mb-3">
            <label style="color: #eaeaea" for="login" class="form-label">Логин</label>
            <input type="text" class="form-control" id="login" aria-describedby="emailHelp" required>
        </div>
        <div class="mb-3">
            <label style="color: #eaeaea" for="pass" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="pass" required>
        </div>
        <button style="margin-bottom: 5px; color: #eaeaea" type="button" onclick="auth()" class="btn btn-danger">Войти</button>
    </form>
</div>
<script src="bootstrap/bootstrap.bundle.js"></script>
<script src="main.js"></script>
</body>
</html>
