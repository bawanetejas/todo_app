
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
    addTodoDb(allTodos);
    renderTodo();

}

renderTodo()

function renderTodo() {
    todos.innerHTML = "";
    const allTodos = JSON.parse(localStorage.getItem("allTodos"))
    allTodos.forEach((val, i) => {

        const p = document.createElement('li');
        p.innerText = val;
        p.id = i;
        const btn = document.createElement("button");
        btn.innerText = "delete"
        btn.addEventListener("click", () => {
            allTodos.splice(i, 1);
            addTodoDb(allTodos);
            renderTodo();
        })
        const editBtn = document.createElement("button")
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => editTodo(i))
        const row = document.createElement("ul")
        const btnContainer = document.createElement('div')
        row.className = "row"
        row.appendChild(p);
        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(btn);
        row.appendChild(btnContainer)
        todos.appendChild(row);
    })

}

function editTodo(i) {
    const val = prompt("Edit todo")
    if (!val || val == "") return
    allTodos[i] = val
    console.log(allTodos)
    addTodoDb(allTodos);
    renderTodo();
}

function addTodoDb(allTodos) {
    localStorage.setItem("allTodos", JSON.stringify(allTodos))
}