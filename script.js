const todosContainer = document.querySelector('.list');
const todosItem = document.querySelector('.list__item');
const todoTemplate = document.querySelector('.list__template');
const addBtn = document.querySelector('.form__button-add');
const form = document.querySelector('.list__form');
const formInput = document.querySelector('.add__input');
const error = document.querySelector(`#${formInput.id}-error`);
const changingInput = document.querySelector('.visability');
const changeBtn = document.querySelector('.change-button');
const editInput = document.querySelector('.change__input');
const inputBtn = document.querySelector('.input__button');
const changingSpan = document.querySelector('.change');
const closeBtn = changingInput.querySelector('.close-button');

const translateItem = (evt) => {
    const item = evt.target.closest('.list__item');
    item.classList.add('todo__deleting-animation');
}

const deleteTask = item => item.remove();

const setListener = (evt) => {
    const item = evt.target.closest('.list__item');
    translateItem(evt);
    item.addEventListener('transitionend', () => {
        hideError(error);
        if (item.classList.contains('todo__deleting-animation') === true) {
            deleteTask(item);
        };
    });
};

const editTask = el => {
    const todoItem = todoTemplate.content;
    const todoEl = todoItem.querySelector('.list__item').cloneNode(true);
    const todoText = todoEl.querySelector('.list__item-text');
    const correctTexts = Array.from(todoEl.querySelectorAll('.list__item-text'));
    todoText.textContent = el;
    todoEl.querySelector('.list__item-delete-button').addEventListener('click', setListener);
    todoEl.querySelector('.list__item-add-button').addEventListener('click', done);
    correctTexts.forEach(x => {
        x.addEventListener('mouseover', openAdvice);
        x.addEventListener('mouseout', hideAdvice);
    });
    correctTexts.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.visability').classList.add('change__input_opened');
        })
    })
    return todoEl;
};

const openAdvice = () => {
    changingSpan.classList.add('change_opened');
}

const hideAdvice = () => {
    changingSpan.classList.remove('change_opened');
}

const closeInput = () => {
    changingInput.classList.remove('change__input_opened');
}

const done = (evt) => {
    const x = evt.target.closest('.list__item');
    x.classList.add('list__item-text_done');
    if (!x.classList.contains('.list__item-text_done')) {
        successfulValidation(error);
        error.textContent = 'Сделано!';
    }
};

const renderText = el => {
    const renderedText = editTask(el);
    const addAnimation = (renderedText) => {
        renderedText.classList.add('todo__add-animation');
    };
    todosContainer.append(renderedText);
    addAnimation(renderedText);
};

const addStr = (evt) => {
    const error = document.querySelector(`#${formInput.id}-error`)
    evt.preventDefault();
    const text = formInput.value;
    renderText(text);
    form.reset();
    addBtn.disabled = true;
    hideError(error);
};

const showError = (error) => {
    error.textContent = 'Больше символов, блэт!'
    error.style.color = 'red';
    error.style.border = '2px solid red';
};

const hideError = (error) => {
    error.textContent = '';
    error.style.border = 'none';
};

const successfulValidation = (error) => {
    error.textContent = 'Всё хорошо, друг, добавляй!';
    error.style.color = 'green';
    error.style.border = '2px solid green';
};

const isValid = () => {
    const error = document.querySelector(`#${formInput.id}-error`)
    if (formInput.validity.valid) {
        addBtn.disabled = false;
        successfulValidation(error);
    }
    else {
        addBtn.disabled = true;
        showError(error);
    }
}

todos.forEach(el => renderText(el));
formInput.addEventListener('input', isValid);
form.addEventListener('submit', addStr);
closeBtn.addEventListener('click', closeInput);

/* inputBtn.addEventListener('click', changeInputs); */