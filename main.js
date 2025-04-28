const formSubmit = document.querySelector('#form');
const submitInput = document.querySelector('#submit-input');
const list = document.querySelector('.list');
let score = 0;
let count = 0;


//создаёт новую задачу
const createListItem = (taskText) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list__item');

  listItem.innerHTML = `
        <span class="item__text">${taskText}</span>
        <div class="wrapper__btn">
          <input class="checkbox-done" type="checkbox" name="checked-done">
          <button class="btn-delete" type="button" data-action="delete">
            <img class="image-btn_delete" src="./images/trash.svg" alt="trash">
          </button>
        </div>
  `
  list.append(listItem);
}

//считает общее кол-во задач
  const calcAllTasks = (score) => {
  const spanScore = document.querySelector('#score');
  spanScore.textContent = `${score}`;
}

//добавляет новую задачу в список
const addListItem = (e) => {
    e.preventDefault();
    score += 1;

    const taskText = submitInput.value;
    createListItem(taskText);

    submitInput.value = "";  //отчищаем инпут
    submitInput.focus();     //возврат фокуса в инпут

    calcAllTasks(score);
  };

formSubmit.addEventListener('submit', addListItem);


//считает выполненные задачи
const calcDoneTasks = (count) => {
  const spanScore = document.querySelector('#count');
  spanScore.textContent = `${count}`;
}

//отмечает выполненные задачи
const checkedTask = (target) => {
  const parentNode = target.closest('.list__item');
  const taskText = parentNode.querySelector('.item__text');
  const taskTextDone = parentNode.querySelector('.item__text_done');

  if (taskText) {
    taskText.classList.add('item__text_done');
    count += 1;
    calcDoneTasks(count);
  }

  if (taskTextDone) {
    taskText.classList.remove('item__text_done');
  }
}

//удаляет выполненную задачу
const deleteTask = (target) => {
  const parentNode = target.closest('.list__item');
  parentNode.remove();
  score -= 1;
  calcAllTasks(score);
 }


list.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('checkbox-done')) {
    checkedTask(target);
  }
  if (target.classList.contains('btn-delete')) {
    deleteTask(target);
  }
});



