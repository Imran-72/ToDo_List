let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];


const displayMessages = () => {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach((item, index) => {
        displayMessage += `
<li>
<input type="checkbox" id="item_${index}" ${item.checked ? "checked" : ""}>
<label for="item_${index}" class="${item.important ? 'important' : ''} //добавил класс для выделения важного текста">${item.todo}</label>
</li>
`;
        todo.innerHTML = displayMessage;
    })
}


addButton.addEventListener('click', () => {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }
    todoList.push(newTodo)
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = '';
})

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}
//готовый код для добавления и сохранения текста

todo.addEventListener('change', (event) => {
    let valueLable = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
    todoList.forEach((item) => {
        if (item.todo === valueLable) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})
//готовый код для сохронения состояния галочки

todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    todoList.forEach((item, index) => {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1)
            } else {
                item.important = !item.important;
            }//код  для удаления input
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})
//готовый код для выделения важности текста