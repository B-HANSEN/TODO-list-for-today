document.querySelector("#todo-list h2").innerHTML = 
`Todos for today: ${new Date().toDateString()}`;

const list = document.querySelector('#todo-list ul');
const forms = document.forms;  // no need to query; access directly with .forms

// delete todos
list.addEventListener('click', e => {
  if(e.target.className == 'delete'){
    const li = e.target.parentElement; // target is the button that gets clicked
    li.parentNode.removeChild(li); // parentNode is the UL, li is that child that contains the event target
  }
});

// add todos
const addForm = forms['add-todo'];
addForm.addEventListener('submit', e => {
  e.preventDefault();  // default is to re-render page
  
  // create elements
  let input = addForm.querySelector('input[type="text"]')
  const li = document.createElement('li');
  const todoName = document.createElement('span');
  const deleteBtn = document.createElement('span');

  // add text content
  todoName.textContent = input.value; // the input value will be the textContent of the newly created span tag
  deleteBtn.textContent = 'delete item';

  // add classes
  todoName.classList.add('name');
  deleteBtn.classList.add('delete');
  
  // append to DOM
  li.appendChild(todoName); // add span element to LI
  li.appendChild(deleteBtn); // add span element to LI
  list.appendChild(li); // add list item to UL

  input.value = '';
});

// show & hide todos
const hideBox = document.querySelector('#hide');
const hideLabel = document.querySelector('#hideText');
hideBox.addEventListener('change', e => {
    if(hideBox.checked) {
        list.style.display = "none";
        hideLabel.textContent = 'All todos are hidden' // or .innerText alternatively
    } else {
        list.style.display = "initial";
        hideLabel.innerText = 'Hide all todos'
    }
});

// filter todos
const searchBar = forms['search-todos'].querySelector('input');
searchBar.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const todos = list.getElementsByTagName('li');
  Array.from(todos).forEach((todo) => {  // create array from HTML collection
    const title = todo.firstElementChild.textContent; 
    todo.style.display = title.toLowerCase().indexOf(term) != -1 ? 'block' : 'none'; // indexOf() == -1 means it does not exist
  });
});

// tabbed content
const tabs = document.querySelector('.tabs');
const infos = document.querySelectorAll('.info');
const panels = document.querySelectorAll('.panel');

tabs.addEventListener('click', e => {
  if (e.target.tagName == 'LI') {  // only when clicked on LI tags
    const targetPanel = document.querySelector(e.target.dataset.target);

    panels.forEach(panel => panel == targetPanel
       ? panel.classList.add('active') // display: block
       : panel.classList.remove('active') // display: none
    );

    infos.forEach(info => info.innerHTML.toLowerCase() == targetPanel.id
        ? info.classList.add('active') // show green button
        : info.classList.remove('active') // show greyed out button
    );
  }
});
