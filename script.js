
const todo = document.getElementById("todo");
const todos = document.getElementById("todos");
const button = document.getElementById("add-todo");
let allTodos = [];


button.addEventListener("click", addTodo)

function addTodo() {
    var todoValue = todo.value;
    if (todoValue == '') return;
    todo.value = ''
    allTodos.push(todoValue);
    renderTodo();

}


function renderTodo() {
    todos.innerHTML = "";
    allTodos.forEach((val, i) => {

        const p = document.createElement('p');
        p.innerText = val;
        p.id = i;
        const btn = document.createElement("button");
        btn.innerText = "delete"
        btn.addEventListener("click", () => {
            allTodos.splice(i, 1);

            renderTodo();
        })
        const row = document.createElement("div")
        row.appendChild(p);
        row.appendChild(btn);
        todos.appendChild(row);
    })

}
