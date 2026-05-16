
const todo = document.getElementById("todo");
const todos = document.getElementById("todos");
const button = document.getElementById("add_todo");
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

        const p = document.createElement('li');
        p.innerText = val;
        p.id = i;
        const btn = document.createElement("button");
        btn.innerText = "delete"
        btn.addEventListener("click", () => {
            allTodos.splice(i, 1);
            renderTodo();
        })
        const editBtn = document.createElement("button")
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => editTodo(i))
        const row = document.createElement("ul")
        row.className = "row"
        row.appendChild(p);
        row.appendChild(editBtn)
        row.appendChild(btn);
        todos.appendChild(row);
    })

}

function editTodo(i) {
    const val = prompt("Edit todo")
    if (!val || val == "") return
    allTodos[i] = val
    renderTodo();
}