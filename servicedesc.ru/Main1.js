
async function exit (){
    window.location.href = 'index.html';
    const res = await fetch('http://api.back.rur/sessionClose');
}

async function sessionTimeout() {
    const res = await fetch('http://api.back.rur/sessionClose');
    window.location.href = 'index.html';
}

async function sessionClose() {
    setTimeout(sessionTimeout, 3600000);
}

async function auth () {

    let login = document.getElementById('login').value,
        pass = document.getElementById('pass').value;

    let formData = new FormData();
    formData.append('login', login);
    formData.append('pass', pass);

    const res = await fetch('http://api.back.rur/auth', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    console.log(data);

    let id = data.id;



    if (data.id === 0) {
        alert('gg');

    }
    else {
        window.location.href = 'admin_main.html';
    }



}

async function addUser() {
    let login = document.getElementById('login').value,
    pass = document.getElementById('pass').value,
    confirm_pass = document.getElementById('confirm_pass').value,
    role = document.getElementById('role').value,
    full_name = document.getElementById('full_name').value,
    email = document.getElementById('email').value,
    phone = document.getElementById('phone').value,
    gender = document.getElementById('gender').value,
    position = document.getElementById('position').value;

let formData = new FormData();
formData.append('login', login);
formData.append('pass', pass);
formData.append('role', role);
formData.append('full_name', full_name);
formData.append('email', email);
formData.append('phone', phone);
formData.append('gender', gender);
formData.append('position', position);

if(pass === confirm_pass) {
    const res = await fetch('http://api.back.rur/users', {
        method: 'POST',
        body: formData
    });
    
    const data = await res.json();
    
    console.log(data); 
    
    
    if (data.user_id === 0) {
        alert('Ошибка');
    }
    else {
        alert('Пользователь создан');
        window.location.href = 'index.html';
    }
}
else {
    alert('Пароли не совпадают');
}

}

async function getTasks (id) {
    let res = await fetch('http://api.back.rur/tasks');
    let tasks = await res.json();
    console.log(id);

    tasks.forEach((task) => {
        document.querySelector('.task-list1').innerHTML += `
        <button class="btn btn-primary" type="button">${task.name}</button>
        `
    })

}