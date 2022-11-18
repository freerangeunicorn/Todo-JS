const listsContainer = document.querySelector('[data-lists]');     //variable to hold todos in the list
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteButton = document.querySelector('[data-delete-button]');


const LOCAL_STORAGE_LIST_KEY = 'task.lists';     //save to users browser so in eveytime user refreshes the page the todos are still there. localstorage is essentially key value pairs. namespace =task, to prevent from overriding info that's already in the localstorage or preventing other websites from overriding your key
const LOCAL_STORAGE_SELECTED_TODO_ID_KEY = 'task.selectedTodoId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; // get this info from localstorage and if it exists pare it into JSON Object of it doesn't exists return empty array
let selectedTodoId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TODO_ID_KEY)   //var for a selected todo item

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedTodoId = e.target.dataset.listId   //ID selected
        console.log(selectedTodoId,'WTHHHHHH')
        saveAndRender();
    };  //element that has been clicked all elements(todos) are added into container hence eventlistener here           
}); 
deleteButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedTodoId)    //return a new list that match the criteria set
selectedTodoId = null,    ///because there's no longer a selected todo
saveAndRender();
});


// eventlistener to add a todo anytime a todo has been submitted
newListForm.addEventListener('submit', e=> {
    e.preventDefault() // stop the page from refreshing the page when submitting 
    const listName = newListInput.value  
    console.log(listName, 'WTFFFFFF')   // get the name of the input value
    if (listName == null || listName === '') return       //make the user type in a name of todo
    const list = createList(listName);
    newListInput.value = null;     // clear the input in placeholder
    lists.push(list); console.log(lists, 'HELLO')
    saveAndRender()  
});


function saveAndRender () {
    save();
    render()
};

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TODO_ID_KEY,selectedTodoId)
};

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks:[
    /*  {   id: 1,
        name: 'Mai',
        complete: false,} */
    ] } //return a unique identifier, explain why u chose Date.now for unique key!!!!!
};

function render() {
  clearTodo(listsContainer);
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id    // to identify which todo in the list you are selecting
    listElement.classList.add('list-name');
    listElement.innerText = list.name;     // to print out the key inside the object
    if(list.id === selectedTodoId) {  //check if selected list has an id
        listElement.classList.add('active-list') 
    }  
    listsContainer.appendChild(listElement);
  });
} //render function to render the list
//while loop to see if each todo elements has a first child, if the element has first child then remove it
function clearTodo(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}; // clear elements




render ()// call the function