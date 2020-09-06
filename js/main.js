'use strict';

document.addEventListener("DOMContentLoaded", () => {

    //tomo el evento submit del form
    document.querySelector("#form-task").addEventListener("submit", saveTask);

    //funcion que se ejecuta para guardar tareas al presionar el botón del form
    function saveTask(e) {
        e.preventDefault();
        //se toman los valores del input
        let title = document.getElementById("title").value;
        let description = document.getElementById("task-description").value;
        //se crea un objeto con su respectivo ID
        const task = {
            title,
            description,
            ID: generateID()
        };
        //se verifica el local storage para crear un arreglo en caso de no haberlo
        if (localStorage.getItem('tasks') === null) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        //se ejecuta la funcion para mostrar las tareas
        showTasks();
    }

    //funcion para mostrar las tareas
    function showTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks != null) {
            let tasks_view = document.getElementById('tasks');
            tasks_view.innerHTML = '';
            for (let i = 0; i < tasks.length; i++) {
                let title = tasks[i].title;
                let description = tasks[i].description;
                let taskID = tasks[i].ID;
                tasks_view.innerHTML += `<div class="card mb-3">
                                        <div class= "card-body">
                                            <h2>${title}</h2> <p>${description}</p>
                                            <button class="btn-delete" taskID="${taskID}">Delete</button>
                                        </div>
                                    </div>`
                to_assignEvent();
            }
        }
    }
    showTasks();

    //funcion para asignar evento a los botones segun su ID
    function to_assignEvent() {
        let btnDelete = document.querySelectorAll(".btn-delete");
        btnDelete.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                deleteTask(this.getAttribute("taskID"));
            })
        })
    }

    //funcion para borrar tareas por ID
    function deleteTask(taskID) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].ID == taskID) {
                tasks.splice(i, 1);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showTasks();

    }

    //funcion para generar ID random
    function generateID() {
        let id = ('ID', uuid.v1());
        return id;
    }

});