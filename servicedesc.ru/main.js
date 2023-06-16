let id = null

async function exit (){
    window.location.href = 'index.php';
    const res = await fetch('http://api.back.rur/sessionClose');
}

async function sessionTimeout() {
    const res = await fetch('http://api.back.rur/sessionClose');
    window.location.href = 'index.php';
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

    let id = data.id;

    if (data.id === 0) {
        alert('gg');
    }
    else {
        if (data.role === "1")
        window.location.href = 'admin_main.php';
        if (data.role === "2") {
        window.location.href = 'executor_main.php';
        }
        if (data.role === "3") {
        window.location.href = 'customer_main.php';
        }
    }


}

async function addTask () {
    let usersRes = await fetch('http://api.back.rur/adminUsers');
    let users = await usersRes.json();
    executor_user_id = null
    customer_user_id = null

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {
        customer_user_id = session.user_id;
    })

    users.forEach((user) => {
        if (user.role === "1") {
            executor_user_id = user.id
        }
    })

    let name = document.getElementById('name').value,
        priority = document.getElementById('priority').value,
        description = document.getElementById('description').value,
        status = "0";

    let formData = new FormData();
    formData.append('name', name);
    formData.append('priority', priority);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('executor_user_id', executor_user_id);
    formData.append('customer_user_id', customer_user_id);

        const res = await fetch('http://api.back.rur/tasks', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        console.log(data);


        if (data.task_id === 0) {
            alert('Ошибка');
        } else {
            alert('Задача добавлена');
            location.reload();
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
        location.reload()
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


        if (session.gender === "1") {
            session.gender = "Мужской"
        }
        if (session.gender === "2") {
            session.gender = "Женский"
        }
        if (session.position === "1") {
            sessionPosition = "Администратор"
        }
        if (session.position === "2") {
            sessionPosition = "Техничекий специалист"
        }
        if (session.position === "3") {
            sessionPosition = "Сотрудник"
        }


        document.querySelector('.Profile').innerHTML +=
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
                      <div class="col-4 col-sm-6">${sessionPosition}</div>
                  </div>
              </div>                                  
          </div>
          <br>`
    })


    let res = await fetch('http://api.back.rur/tasks');
    let tasks = await res.json();

    const newTasks = tasks.filter(task => {
        if (task.status === "0") {
            return true
        }
    })


    newTasks.forEach((newTask) => {
        if (newTask.priority === "0") {
            newTask.priority = "Низкий"
        }
        if (newTask.priority === "1") {
            newTask.priority = "Средний"
        }
        if (newTask.priority === "2") {
            newTask.priority = "Высокий"
        }
        if (newTask.role === "1") {
            newTask.full_name = "Не назначен"
        }
        document.querySelector('.task-list-new').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${newTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${newTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${newTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-success" onclick="message('${newTask.id}', '${newTask.customer_user_id}', '${newTask.name}', '1')" data-bs-dismiss="modal">Принять</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })
}

async function getTasks () {

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


    if(session.gender === "1") {session.gender = "Мужской"}
    if(session.gender === "2") {session.gender = "Женский"}
    if(session.position === "1") {sessionPosition = "Администратор"}
    if(session.position === "2") {sessionPosition = "Техничекий специалист"}
    if(session.position === "3") {sessionPosition = "Сотрудник"}


    document.querySelector('.Profile').innerHTML +=
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
                      <div class="col-4 col-sm-6">${sessionPosition}</div>
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
        if(newTask.priority === "0") {newTask.priority = "Низкий"}
        if(newTask.priority === "1") {newTask.priority = "Средний"}
        if(newTask.priority === "2") {newTask.priority = "Высокий"}
        if(newTask.role === "1"){newTask.FullName = "Не назначен"}
            document.querySelector('.task-list-new').innerHTML +=
                `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${newTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${newTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${newTask.description}</p>
                                </div>
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
                                              <div class="col-4 col-sm-6">${newTask.FullName}</div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${newTask.id})" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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
        if(successTask.priority === "0") {successTask.priority = "Низкий"}
        if(successTask.priority === "1") {successTask.priority = "Средний"}
        if(successTask.priority === "2") {successTask.priority = "Высокий"}
        document.querySelector('.admin-task-list-success').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${successTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${successTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${successTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${successTask.id})" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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
        if(processTask.priority === "0") {processTask.priority = "Низкий"}
        if(processTask.priority === "1") {processTask.priority = "Средний"}
        if(processTask.priority === "2") {processTask.priority = "Высокий"}
        document.querySelector('.admin-task-list-process').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${processTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${processTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${processTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${processTask.id})" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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
        if(completeTask.priority === "0") {completeTask.priority = "Низкий"}
        if(completeTask.priority === "1") {completeTask.priority = "Средний"}
        if(completeTask.priority === "2") {completeTask.priority = "Высокий"}
        document.querySelector('.admin-task-list-complete').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${completeTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${completeTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${completeTask.description}</p>
                                </div>
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
                              </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${completeTask.id})" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })

    const customerDeleteTasks = tasks.filter(task => {
        if (task.status === "4") {
            return true
        }
    })


    customerDeleteTasks.forEach((customerDeleteTask) => {
        if(customerDeleteTask.priority === "0") {customerDeleteTask.priority = "Низкий"}
        if(customerDeleteTask.priority === "1") {customerDeleteTask.priority = "Средний"}
        if(customerDeleteTask.priority === "2") {customerDeleteTask.priority = "Высокий"}
        if (customerDeleteTask.role === "1") {
            customerDeleteTask.full_name = "Не назначен"
        }
        document.querySelector('.admin-task-list-customer-delete').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${customerDeleteTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${customerDeleteTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${customerDeleteTask.description}</p>
                                </div>
                        </a>
                    </div>

                    <div class="modal fade" id="exampleModal${customerDeleteTask.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${customerDeleteTask.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${customerDeleteTask.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${customerDeleteTask.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${customerDeleteTask.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${customerDeleteTask.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${customerDeleteTask.id})" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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

        document.querySelector('.Profile').innerHTML +=
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

    let userRole = '';
    let userPosition = '';
    let userGender = '';


    users.forEach((user) => {
        if(user.gender === "1") {userGender = "Мужской"}
        if(user.gender === "2") {userGender = "Женский"}
        if(user.position === "1") {userPosition = "Администратор"}
        if(user.position === "2") {userPosition = "Техничекий специалист"}
        if(user.position === "3") {userPosition = "Сотрудник"}
        if(user.role === "2") {userRole = "Исполнитель"}
        if(user.role === "3") {userRole = "Заказчик"}

        document.querySelector('.employees-card').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: 10px; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${user.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${user.full_name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${userPosition}</p>
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
                                              <div class="col-4 col-sm-6">${userGender}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Должность :</div>
                                              <div class="col-4 col-sm-6">${userPosition}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Роль :</div>
                                              <div class="col-4 col-sm-6">${userRole}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                              </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-danger" onclick="deleteUser('${user.id}', '${user.role}')" data-bs-dismiss="modal">Удалить</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })




}

async function updateStatus(data) {
    const statusRes = await fetch('http://api.back.rur/taskStatus', {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
}

async function deleteUser(id, role) {

    if (role === "2") {
        let formData = new FormData();
        formData.append('id', id);

        const executor_res = await fetch('http://api.back.rur/tasksById', {
            method: 'POST',
            body: formData
        });

        let tasks = await executor_res.json();

        tasks.forEach((task) => {
            const data = {
                id: task.id,
                status: "0",
                executor_id: "14",
                customer_id: task.customer_user_id
            };
            updateStatus(data)

        })
    }

    if (role === "3") {
        let formData = new FormData();
        formData.append('id', id);

        const executor_res = await fetch('http://api.back.rur/tasksById', {
            method: 'POST',
            body: formData
        });

        let tasks = await executor_res.json();

        tasks.forEach((task) => {
            const data = {
                id: task.id,
                status: "4",
                executor_id: task.executor_user_id,
                customer_id: "1"
            };
            updateStatus(data)

        })
    }

    const res = await fetch(`http://api.back.rur/users/${id}`, {
        method: "DELETE"
    })

    const data = res.json()
    if (data.status === "true") {
        location.reload();
    }



}

async function deleteTask(id) {


    const res = await fetch(`http://api.back.rur/tasks/${id}`, {
        method: "DELETE"
    })

    const data = res.json()
    console.log(data)
    if (data.status === "true") {
        location.reload();
    }

}

async function getMessageById () {

    id = null;

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


        id = session.user_id;
        if(session.gender === "1") {session.gender = "Мужской"}
        if(session.gender === "2") {session.gender = "Женский"}
        if(session.position === "1") {sessionPosition = "Администратор"}
        if(session.position === "2") {sessionPosition = "Техничекий специалист"}
        if(session.position === "3") {sessionPosition = "Сотрудник"}


        document.querySelector('.Profile').innerHTML +=
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
                      <div class="col-4 col-sm-6">${sessionPosition}</div>
                  </div>
              </div>                                  
          </div>
          <br>`})



    let formData = new FormData();
    formData.append('customer_id', id);

    const res = await fetch('http://api.back.rur/messagesById', {
        method: 'POST',
        body: formData
    });

    let messages = await res.json();

    messages.forEach((message) => {
        document.querySelector('.message-list').innerHTML += `
        <ul style="margin-bottom: 5px" class="list-group list-group-horizontal">
                <li style="background-color: #303030; color: white" class="list-group-item list-group-item-dark">${message.theme}</li>
                <li style="background-color: #303030; color: white" class="list-group-item list-group-item-dark">${message.message_text}</li>
            </ul>`
    })
}

function message(task_id, customer_id, theme, status) {
    addMessage(task_id, customer_id, theme, status)
}

async function addMessage(task_id, customer_id, theme, status) {
    user_id = null;

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {

    user_id = session.user_id;})
    let message_text = null
    if (status === "1"){
        message_text = 'Ваша задача изменила статус на "принято"'
    }
    if (status === "2"){
        message_text = 'Ваша задача изменила статус на "в работе"'
    }
    if (status === "3"){
        message_text = 'Ваша задача изменила статус на "выполнено"'
    }
    let formData = new FormData();
    formData.append('task_id', task_id);
    formData.append('customer_id', customer_id);
    formData.append('theme', theme);
    formData.append('message_text', message_text);

    const res = await fetch('http://api.back.rur/messages', {
        method: 'POST',
        body: formData
    });
    let messageRes = await res.json()

    const data = {
        id: task_id,
        status: status,
        executor_id: user_id,
        customer_id: customer_id
    };

    const statusRes = await fetch('http://api.back.rur/taskStatus', {
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    location.reload()

}

async function getCustomerTasksById () {


    id = null;

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


        id = session.user_id;
        if (session.gender === "1") {
            session.gender = "Мужской"
        }
        if (session.gender === "2") {
            session.gender = "Женский"
        }
        if (session.position === "1") {
            sessionPosition = "Администратор"
        }
        if (session.position === "2") {
            sessionPosition = "Техничекий специалист"
        }
        if (session.position === "3") {
            sessionPosition = "Сотрудник"
        }


        document.querySelector('.Profile').innerHTML +=
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
                      <div class="col-4 col-sm-6">${sessionPosition}</div>
                  </div>
              </div>                                  
          </div>
          <br>`
    })


    let formData = new FormData();
    formData.append('id', id);

    const res = await fetch('http://api.back.rur/tasksById', {
        method: 'POST',
        body: formData
    });


    let tasks = await res.json();


    tasks.forEach((task) => {
        if (task.priority === "0") {
            task.priority = "Низкий"
        }
        if (task.priority === "1") {
            task.priority = "Средний"
        }
        if (task.priority === "2") {
            task.priority = "Высокий"
        }
        document.querySelector('.customer-task-list').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${task.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${task.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${task.description}</p>
                                </div>
                                </a>
                    </div>

                    <div class="modal fade" id="exampleModal${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: #303030">
                          <div class="modal-header">
                            <h1 style="color: white" class="modal-title fs-5" id="exampleModalLabel">${task.name}</h1>
                          </div>
                          <div class="modal-body"  style="color: white">
                              <div class="container-fluid">
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Название :</div>
                                              <div class="col-4 col-sm-6">${task.name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Описание :</div>
                                              <div class="col-4 col-sm-6">${task.description}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Исполнитель :</div>
                                              <div class="col-4 col-sm-6">${task.full_name}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  <div class="row">
                                      <div class="col-sm-9">
                                          <div class="row">
                                              <div class="col-8 col-sm-6">Приоритет :</div>
                                              <div class="col-4 col-sm-6">${task.priority}</div>
                                          </div>
                                      </div>                                  
                                  </div>
                                  <br>
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-success" onclick="message('${task.id}', '${task.customer_user_id}', '${task.name}', '2')" data-bs-dismiss="modal">В работу</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                        </div>
                      </div>
                    </div>`
    })
}

async function getTasksById () {



    id = null;

    let res_session = await fetch('http://api.back.rur/session');
    let sessions = await res_session.json();

    sessions.forEach((session) => {


        id = session.user_id;
        if(session.gender === "1") {session.gender = "Мужской"}
        if(session.gender === "2") {session.gender = "Женский"}
        if(session.position === "1") {sessionPosition = "Администратор"}
        if(session.position === "2") {sessionPosition = "Техничекий специалист"}
        if(session.position === "3") {sessionPosition = "Сотрудник"}


        document.querySelector('.Profile').innerHTML +=
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
                      <div class="col-4 col-sm-6">${sessionPosition}</div>
                  </div>
              </div>                                  
          </div>
          <br>`})



    let formData = new FormData();
    formData.append('id', id);

    const res = await fetch('http://api.back.rur/tasksById', {
        method: 'POST',
        body: formData
    });

    let tasks = await res.json();

    const successTasks = tasks.filter(task => {
        if (task.status === "1") {
            return true
        }
    })

    successTasks.forEach((successTask) => {
        if(successTask.priority === "0") {successTask.priority = "Низкий"}
        if(successTask.priority === "1") {successTask.priority = "Средний"}
        if(successTask.priority === "2") {successTask.priority = "Высокий"}
        document.querySelector('.task-list-success').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${successTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${successTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${successTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-success" onclick="message('${successTask.id}', '${successTask.customer_user_id}', '${successTask.name}', '2')" data-bs-dismiss="modal">В работу</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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
        if(processTask.priority === "0") {processTask.priority = "Низкий"}
        if(processTask.priority === "1") {processTask.priority = "Средний"}
        if(processTask.priority === "2") {processTask.priority = "Высокий"}
        document.querySelector('.task-list-process').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${processTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${processTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${processTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-outline-success" onclick="message('${processTask.id}', '${processTask.customer_user_id}', '${processTask.name}', '3')" data-bs-dismiss="modal">Выполнено</button>
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
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
        if(completeTask.priority === "0") {completeTask.priority = "Низкий"}
        if(completeTask.priority === "1") {completeTask.priority = "Средний"}
        if(completeTask.priority === "2") {completeTask.priority = "Высокий"}
        document.querySelector('.task-list-complete').innerHTML +=
            `
                    
                    <div class="card border-danger mb-3" style="max-width: 18rem; margin: auto; background-color: #303030">
                        <a href="" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal${completeTask.id}">
                            <div class="card-header bg-transparent border-danger" style="color: white">${completeTask.name}</div>
                                <div class="card-body text-danger">
                                    <p class="card-text" style="color: white">${completeTask.description}</p>
                                </div>
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
                                  </div>
                          <div class="modal-footer">
                            <button  style="color: white" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                          </div>
                        </div>
                      </div>
                    </div>`

    })


}