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

    listItem.innerHTML = `<label><input type='checkbox'> ${item.title}</label>`;
    if (item.completed) {
      listItem.classList.add("completed");
    }
    divList.append(listItem);
  }
};

// =================================== adding tasks to the list
const addTaskToList = () => {
  const task = document.querySelector("#add-task-input").value;

  if (!task) {
    alert("Task is empty");
    return false;
  }

  let newTask = {
    userId: 1,
    id: 21,
    title: task,
  };
  tasks.unshift(newTask);
  renderListOfTasks(tasks);
};

// =================================== START
let tasks;

getListFromAPI().then((response) => {
  renderListOfTasks(response);
  tasks = response;
  // console.log(tasks);
});

const addButton = document.querySelector('[data-target="addButton"]');
addButton.addEventListener("click", addTaskToList);
