
async function exit (){
    window.location.href = 'index.html';
    const res = await fetch('http://api.back.ru/sessionClose');
}

async function sessionTimeout() {
    const res = await fetch('http://api.back.ru/sessionClose');
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

    const res = await fetch('http://api.back.ru/auth', {
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

async function getTasks (id) {
    let res = await fetch('http://api.back.ru/tasks');
    let tasks = await res.json();
    console.log(id);

    tasks.forEach((task) => {
        document.querySelector('.task-list1').innerHTML += `
        <button class="btn btn-primary" type="button">${task.name}</button>
        `
    })

}