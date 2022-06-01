const todosContainer = document.querySelector('.list');
const todosItem = document.querySelector('.list__item');
const todoTemplate = document.querySelector('.list__template');
const addString = document.querySelector('.form__button-add');
const form = document.querySelector('.list__form');
const formInput = document.querySelector('.add__input');

const editTask = el => {
    const todoItem = todoTemplate.content;
    const todoEl = todoItem.querySelector('.list__item').cloneNode(true);
    const todoText = todoEl.querySelector('.list__item-text');
    todoText.textContent = el;
    todoEl.querySelector('.list__item-delete-button').addEventListener('click', (evt) => {
        const item = evt.target.closest('.list__item');
        const remove = () => {
            item.remove();
        };
        const translate = () => {
            item.classList.add('todo__deleting-animation');
        };
        translate();
        item.addEventListener('transitionend', () => {
            if (item.classList.contains('todo__deleting-animation') === true) {
                remove(item);
            };
        });
    });
    
    todoEl.querySelector('.list__item-add-button').addEventListener('click', done);
    return todoEl;
};

const done = evt => {
    const x = evt.target.closest('.list__item');
    x.classList.toggle('list__item-text_done');
};

const renderText = el => {
    const renderedText = editTask(el);
    const addAnimation = (renderedText) => {
        renderedText.classList.add('todo__add-animation');
    };
    todosContainer.append(renderedText);
    addAnimation(renderedText);
};

const addStr = (e) => {
    e.preventDefault();
    const text = formInput.value;
    renderText(text);
    form.reset();
};

todos.forEach((el) => {
    renderText(el);
});

formInput.addEventListener('input', () => {
    if (formInput.value.length > 0) {
        addString.disabled = false;
    }
    else {
        addString.disabled = true;
    }
});

form.addEventListener('submit', (e) => {
    addStr(e);
    addString.disabled = true;
});