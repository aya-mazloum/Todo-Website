const logoutBtn = document.getElementById("logout");
const addBtn = document.getElementById("add");
const todoInput = document.getElementById("todo");
const todoListContainer = document.getElementById("todoListContainer");


function checkLoggedUser() {
    const userLoggedIn = localStorage.getItem("loggedIn");
    console.log(userLoggedIn);
    if (userLoggedIn == "no" || userLoggedIn == null) {
        document.location.href = "../pages/login.html";
    }
};

//window.onload = checkLoggedUser();

window.addEventListener('beforeunload', function (e) {
    const remember = localStorage.getItem("remember");
    if (remember == "no" || remember == null)
        localStorage.setItem("loggedIn", "no");
});

logoutBtn.addEventListener("click", function () {
    localStorage.setItem("loggedIn", "no");
    localStorage.setItem("remember", "no");
    document.location.href = "./pages/login.html";
});

function todoItemGenerator(todo) {
    const isChecked = todo.done ? 'checked' : '';
    return `<div class="flex row todo-item" id="${todo.id}">
                <label>
                    <input type="checkbox" class="todo-done-checkbox" ${isChecked}>${todo.title}
                </label>
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-solid fa-xmark delete-todo"></i>
            </div>`;
}

const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
for (let i = 0; i < todoList.length; i++) {
    const todoElement = todoList[i];
    const todoItem = todoItemGenerator(todoElement);
    todoListContainer.innerHTML += todoItem;
}


function findTodoItemWithId(todoList, id, idValue) {
    return todoList.find(function(obj) {
        return obj[id] === idValue;
    });
}

function deleteTodoItemWithId(todoList, id, idValue) {
    return todoList.filter(function(obj) {
        return obj[id] !== idValue;
    });
}

todoDoneCheckBoxes = document.querySelectorAll(".todo-done-checkbox");
for (let i = 0; i < todoDoneCheckBoxes.length; i++) {
    const checkbox = todoDoneCheckBoxes[i];

    checkbox.addEventListener("change", function () {
        const todoItemId = checkbox.parentNode.parentNode.id;
        const changedTodo = document.getElementById(todoItemId);
        const changedTodolabel = changedTodo.firstElementChild;
        if (checkbox.checked) {
            changedTodolabel.classList.add("completed");
            const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
            const newTodoList = deleteTodoItemWithId(todoList, 'id', todoItemId);
            const updatedTodoItem = findTodoItemWithId(todoList, 'id', todoItemId);
            updatedTodoItem["done"] = true;
            newTodoList.push(updatedTodoItem);
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else{
            if(changedTodolabel.classList.toggle("completed"))
                changedTodolabel.classList.remove("completed");
                const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
                const newTodoList = deleteTodoItemWithId(todoList, 'id', todoItemId);
                const updatedTodoItem = findTodoItemWithId(todoList, 'id', todoItemId);
                updatedTodoItem["done"] = false;
                newTodoList.push(updatedTodoItem);
                localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    });
}

todoDeleteBtns = document.querySelectorAll(".delete-todo");
for (let i = 0; i < todoDeleteBtns.length; i++) {
    const todoDeleteBtn = todoDeleteBtns[i];

    todoDeleteBtn.addEventListener("click", function () {
        const todoItemId = todoDeleteBtn.parentNode.id;
        const deletedTodo = document.getElementById(todoItemId);
        deletedTodo.remove();
        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        const newTodoList = deleteTodoItemWithId(todoList, 'id', todoItemId);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    });
}

addBtn.addEventListener("click", function () {
    const todoTitle = todoInput.value;
    var uniqueId = "todo_" + new Date().getTime();
    const newTodo = {
        id: uniqueId,
        title: todoTitle,
        done: false
    };
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    console.log(todoList);
    todoList.push(newTodo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    const todoItem = todoItemGenerator(newTodo);
    todoListContainer.innerHTML += todoItem;
});