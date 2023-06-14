
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

async function getNewTasks () {

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


    if(session.gender === "1") {session.gender = "Мужской"}
    if(session.gender === "2") {session.gender = "Женский"}
    if(session.position === "1") {session.position = "Руководитель"}
    if(session.position === "2") {session.position = "Сотрудник"}

    document.querySelector('.adminProfile').innerHTML +=
        `<div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">ФИО :</div>
                      <div class="col-4 col-sm-6">${session.full_name}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Email :</div>
                      <div class="col-4 col-sm-6">${session.email}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Телефон :</div>
                      <div class="col-4 col-sm-6">${session.phone}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Пол :</div>
                      <div class="col-4 col-sm-6">${session.gender}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Должность :</div>
                      <div class="col-4 col-sm-6">${session.position}</div>
                  </div>
              </div>                                  
          </div>
          <br>`})



    let res = await fetch('http://api.back.rur/tasks');
    let tasks = await res.json();
    const newTasks = tasks.filter(task => {
        if (task.status === "0") {
            return true
        }
    })


    newTasks.forEach((newTask) => {
            document.querySelector('.task-list-new').innerHTML +=
                `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${newTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${newTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${newTask.description}</p>
                                </div>
                            <div class="card-footer bg-transparent border-danger" style="color: white">${"От " + newTask.start_date}</div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${newTask.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${newTask.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${newTask.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${newTask.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${newTask.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${newTask.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата создания :</div>
                                              <div class="col-4 col-sm-6">${newTask.start_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата окончания :</div>
                                              <div class="col-4 col-sm-6">${newTask.end_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })

    const successTasks = tasks.filter(task => {
        if (task.status === "1") {
            return true
        }
    })


    successTasks.forEach((successTask) => {
        document.querySelector('.task-list-success').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${successTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${successTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${successTask.description}</p>
                                </div>
                            <div class="card-footer bg-transparent border-danger" style="color: white">${"От " + successTask.start_date}</div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${successTask.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${successTask.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${successTask.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${successTask.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${successTask.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${successTask.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата создания :</div>
                                              <div class="col-4 col-sm-6">${successTask.start_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата окончания :</div>
                                              <div class="col-4 col-sm-6">${successTask.end_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })

    const processTasks = tasks.filter(task => {
        if (task.status === "2") {
            return true
        }
    })


    processTasks.forEach((processTask) => {
        document.querySelector('.task-list-process').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${processTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${processTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${processTask.description}</p>
                                </div>
                            <div class="card-footer bg-transparent border-danger" style="color: white">${"От " + processTask.start_date}</div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${processTask.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${processTask.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${processTask.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${processTask.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${processTask.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${processTask.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата создания :</div>
                                              <div class="col-4 col-sm-6">${processTask.start_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата окончания :</div>
                                              <div class="col-4 col-sm-6">${processTask.end_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })

    const completeTasks = tasks.filter(task => {
        if (task.status === "3") {
            return true
        }
    })


    completeTasks.forEach((completeTask) => {
        document.querySelector('.task-list-complete').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${completeTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${completeTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${completeTask.description}</p>
                                </div>
                            <div class="card-footer bg-transparent border-danger" style="color: white">${"От " + completeTask.start_date}</div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${completeTask.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${completeTask.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${completeTask.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${completeTask.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${completeTask.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${completeTask.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата создания :</div>
                                              <div class="col-4 col-sm-6">${completeTask.start_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Дата окончания :</div>
                                              <div class="col-4 col-sm-6">${completeTask.end_date}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })




}

async function getEmployess() {
    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


        if(session.gender === "1") {session.gender = "Мужской"}
        if(session.gender === "2") {session.gender = "Женский"}
        if(session.position === "1") {session.position = "Руководитель"}
        if(session.position === "2") {session.position = "Сотрудник"}

        document.querySelector('.adminProfile').innerHTML +=
            `<div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">ФИО :</div>
                      <div class="col-4 col-sm-6">${session.full_name}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Email :</div>
                      <div class="col-4 col-sm-6">${session.email}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Телефон :</div>
                      <div class="col-4 col-sm-6">${session.phone}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Пол :</div>
                      <div class="col-4 col-sm-6">${session.gender}</div>
                  </div>
              </div>                                  
          </div>
          <br>
          <div class="row">
              <div class="col-sm-9">
                  <div class="row">
                      <div class="col-8 col-sm-6">Должность :</div>
                      <div class="col-4 col-sm-6">${session.position}</div>
                  </div>
              </div>                                  
          </div>
          <br>`})

    let employeesRes = await fetch('http://api.back.rur/users');
    let users = await employeesRes.json();


    users.forEach((user) => {
        if(user.gender === "1") {user.gender = "Мужской"}
        if(user.gender === "2") {user.gender = "Женский"}
        if(user.position === "1") {user.position = "Руководитель"}
        if(user.position === "2") {user.position = "Сотрудник"}
        if(user.role === "1") {user.role = "Admin"}
        if(user.role === "2") {user.role = "User"}

        document.querySelector('.employees-card').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: 10px; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${user.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${user.full_name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${user.position}</p>
                                </div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${user.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${user.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">ФИО :</div>
                                              <div class="col-4 col-sm-6">${user.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Email :</div>
                                              <div class="col-4 col-sm-6">${user.email}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Телефон :</div>
                                              <div class="col-4 col-sm-6">${user.phone}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Пол :</div>
                                              <div class="col-4 col-sm-6">${user.gender}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Должность :</div>
                                              <div class="col-4 col-sm-6">${user.position}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Роль :</div>
                                              <div class="col-4 col-sm-6">${user.role}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })
}