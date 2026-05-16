
const todo = document.getElementById("todo");
const todos = document.getElementById("todos");
const button = document.getElementById("add_todo");
let allTodos = [];
let dragIndex = null;


button.addEventListener("click", addTodo)

function addTodo() {
    var todoValue = todo.value;
    if (todoValue == '') return;
    todo.value = ''
    allTodos.push({ todoValue, flag: false });
    addTodoDb(allTodos);
    renderTodo();

}

renderTodo()

function renderTodo() {
    todos.innerHTML = "";
    allTodos = JSON.parse(localStorage.getItem("allTodos"))
    allTodos.forEach((val, i) => {

        const p = document.createElement('li');
        p.innerText = val.todoValue;
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
        btnContainer.className = "btnContainer"
        const checkbox = document.createElement('input')
        checkbox.id = 'checkbox'
        checkbox.type = 'checkbox'
        checkbox.checked = val.flag
        checkbox.addEventListener('change', () => {
            val.flag = checkbox.checked;
            console.log(val)
            allTodos[i].flag = val.flag;
            addTodoDb(allTodos)
        })

        row.className = "row"
        row.appendChild(p);

        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(btn);
        btnContainer.appendChild(checkbox)

        row.appendChild(btnContainer);

        //drag and drop
        row.draggable = true;
        row.addEventListener("dragstart", () => {
            dragIndex = i;
        })
        row.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
        row.addEventListener("drop", () => {
            const dragItem = allTodos[dragIndex];
            allTodos.splice(dragIndex, 1);
            allTodos.splice(i, 0, dragItem);
            addTodoDb(allTodos)
            renderTodo();
        })
        todos.appendChild(row);
    })

}

function editTodo(i) {
    const val = prompt("Edit todo")
    if (!val || val == "") return

    allTodos[i].todoValue = val

    addTodoDb(allTodos);
    renderTodo();
}

function addTodoDb(allTodos) {
    localStorage.setItem("allTodos", JSON.stringify(allTodos))
}

// done task
// rmaining task
// all task