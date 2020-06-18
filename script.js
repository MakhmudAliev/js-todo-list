/*
Написать список задач на ванильном JavaScript. !!! Не использовать JS библиотеки
1. Подгружать список по endpoint https://jsonplaceholder.typicode.com/users/1/todos
2. Список должен храниться в массиве
3. Вывести список в DOM
4. Добавить возможность создания/удаления/редактирования задачи. Операции со списком проводятся локально.
5. Опционально: реализовать поиск задачи локально
P.S Можно использовать любой CSS фреймворк
*/

// ================================== receive data from API
async function getListFromAPI() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users/1/todos";
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// ================================== render the list from received data
const renderListOfTasks = (data) => {
  const divList = document.querySelector("#todoList");
  divList.innerHTML = "";

  for (let item of data) {
    let listItem = document.createElement("div");
    listItem.classList.add("mt-1");
    // listItem.classList.add(`task${item.id}`);

    listItem.innerHTML = `
      <label class='task${item.id} ${
      item.completed ? "completed" : ""
    }'><input type='checkbox' ${
      item.completed ? "checked" : ""
    } data-attribute="task${item.id}" 
        id='${item.id}'
        class="checkbox" 
        onchange="toggleTask(${item.id})" 
        > 
          ${item.title}
      </label>
      <span class='ml-2 text-blue-600 nostrike'><a href='' class='nostrike'>edit</a></span>
      <span class='ml-2 text-red-600 nostrike'><a href=''>x delete</a></span>
      `;
    divList.append(listItem);
  }
};

// =================================== adding tasks to the list
const addTaskToList = () => {
  const task = document.querySelector("#add-task-input").value;
  document.querySelector("#add-task-input").value = "";
  if (!task) {
    alert("Task is empty");
    return false;
  }

  let ids = tasks.map((item) => item.id);
  let maxId = Math.max(...ids);

  let newTask = {
    userId: 1,
    id: maxId + 1,
    title: task,
    completed: false,
  };

  tasks.unshift(newTask);
  renderListOfTasks(tasks);
  console.log(tasks);
};

// ===================================
const toggleTask = (id) => {
  // strike task
  const assosiatedTask = document.getElementsByClassName(`task${id}`);
  assosiatedTask[0].classList.toggle("completed");

  // change completed property of task
  let itemToChange = tasks.find((item) => item.id === id);
  itemToChange.completed = !itemToChange.completed;
};

// =================================== START
let tasks = [];

getListFromAPI().then((response) => {
  renderListOfTasks(response);
  tasks = response;
});

const addButton = document.querySelector('[data-target="addButton"]');
addButton.addEventListener("click", addTaskToList);
