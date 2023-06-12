
var id = null;
var login = null;
var pass = null;
var role = null;
var full_name = null;
var email = null;
var phone = null;
var date_of_birth = null;
var gender = null;
var position = null;
var task_name = null;
var start_date = null;
var end_date = null;
var priority = null;
var description = null;
var them = null;
var message_text = null;
var message_time = null;
function exit (){
    window.location.href = 'index.html';
    let id = null;
    let login = null;
    let pass = null;
    let role = null;
    let full_name = null;
    let email = null;
    let phone = null;
    let date_of_birth = null;
    let gender = null;
    let position = null;
    let task_name = null;
    let start_date = null;
    let end_date = null;
    let priority = null;
    let description = null;
    let them = null;
    let message_text = null;
    let message_time = null;
}

async function auth () {

    let login = document.getElementById('login').value,
        pass = document.getElementById('pass').value;

    let formData = new FormData();
    formData.append('login', login);
    formData.append('pass', pass);

    const res = await fetch('http://api.back.ru/auth', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    console.log(data);

    var data_user = [];

    data_user[0] = data.id;
    data_user[1] = data.login;
    data_user[2] = data.pass;
    data_user[3] = data.role;
    data_user[4] = data.full_name;
    data_user[5] = data.email;
    data_user[6] = data.phone;
    data_user[7] = data.date_of_birth;
    data_user[8] = data.gender;
    data_user[9] = data.position;


    console.log(data.full_name);

    if (data.id === 0) {
        alert('gg');

    }
    else {
        window.location.href = 'admin_main.html';
    }

    return data_user;

}

async function getTasks () {
    let res = await fetch('http://api.back.ru/tasks');
    let tasks = await res.json();


    tasks.forEach((task) => {
        document.querySelector('.task-list1').innerHTML += `
        <button class="btn btn-primary" type="button">${task.name}</button>
        `
    })

    console.log(data_user);
}