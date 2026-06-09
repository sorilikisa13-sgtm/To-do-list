const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");

function updateStats(){
    const tasks = document.querySelectorAll(".task");
    const completed = document.querySelectorAll(".task-checkbox:checked");

    totalCount.textContent = tasks.length;
    completedCount.textContent = completed.length;
    activeCount.textContent = tasks.length - completed.length;
}

function createTask(text){

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
        <div class="left">
            <input type="checkbox" class="task-checkbox">
            <span>${text}</span>
        </div>

        <div class="actions">
            <i class="fa-regular fa-pen-to-square edit"></i>
            <i class="fa-regular fa-trash-can delete"></i>
        </div>
    `;

    const checkbox = task.querySelector(".task-checkbox");
    const span = task.querySelector("span");

    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
        updateStats();
    });

    task.querySelector(".delete").addEventListener("click", () => {
        task.remove();
        updateStats();
    });

    task.querySelector(".edit").addEventListener("click", () => {
        const newText = prompt("Edit Task", span.textContent);
        if(newText){
            span.textContent = newText;
        }
    });

    taskList.appendChild(task);
    updateStats();
}

function addTask(){
    const text = input.value.trim();
    if(text === "") return;

    createTask(text);
    input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        addTask();
    }
});
