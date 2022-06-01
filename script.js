const todosContainer = document.querySelector('.list');
const todosItem = document.querySelector('.list__item');
const todoTemplate = document.querySelector('.list__template');
const addString = document.querySelector('.form__button-add');
const form = document.querySelector('.list__form');
const formInput = document.querySelector('.add__input')

/* input__btn_disabled */

const editDelo = el => {
    const todoItem = todoTemplate.content;
    const todoEl = todoItem.querySelector('.list__item').cloneNode(true);
    const todoText = todoEl.querySelector('.list__item-text');
    todoText.textContent = el;
    todoEl.querySelector('.list__item-delete-button').addEventListener('click', deleting);
    todoEl.querySelector('.list__item-add-button').addEventListener('click', done);
    return todoEl;
}

const done = evt => {
    const x = evt.target.closest('.list__item');
    x.classList.toggle('list__item-text_done');
}

const deleting = evt => {
    evt.target.closest('.list__item').remove();
} 

const renderText = el => {
    const renderedText = editDelo(el);
    todosContainer.prepend(renderedText);
} 

function addStr (e) {
    e.preventDefault();
    const text = formInput.value; 
    renderText(text);
    form.reset();
}

todos.forEach((el) => {
    renderText(el);
});

form.addEventListener('submit', (e) => {
    addStr(e);
});


