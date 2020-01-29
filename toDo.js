const to_do_form = document.querySelector(".js-toDoForm"),
    to_do_input = to_do_form.querySelector("input"),
    to_do_list = document.querySelector(".js-toDoList");
    
const TO_DOS_KEY_LS = "toDos",
    TO_DO_DONE_CN = "toDoDone",
    TO_DO_NOT_DONE_CN = "toDoNotDone",
    TO_DO_LIST_ITEM_CN = "toDoListItem",
    TO_DO_TEXT_CN = "toDoText";
    
let to_dos = []; 

function handleToDoFormSubmit(e) {
    e.preventDefault();
    addToDo();
    saveToDos();
    to_do_input.value="";
    paintToDoList();
}

function addToDo() {
     // const current_to_do_id = to_dos.length + 1;
     const current_to_do_text = to_do_input.value;
     const current_to_do_done = false;
 
     const current_to_do = {
         // id: current_to_do_id,
         text: current_to_do_text,
         done: current_to_do_done
     };

     to_dos.push(current_to_do);
}

function saveToDos() {
    localStorage.setItem(TO_DOS_KEY_LS, JSON.stringify(to_dos));
}

function getToDo() {
    to_do_form.classList.remove(HIDING_CN);
    to_do_form.classList.add(SHOWING_CN);

    to_do_form.addEventListener("submit", handleToDoFormSubmit);
}

function removeAllChildren(node) {      //helper function of paintToDo()
    node.innerHTML = "";
}

function changeToDoTextClassList(checkbox) { 
    const toDoText = checkbox.parentNode.querySelector(`.${TO_DO_TEXT_CN}`);
    if(checkbox.checked) {
        toDoText.classList.remove(TO_DO_NOT_DONE_CN);
        toDoText.classList.add(TO_DO_DONE_CN);
    } else {
        toDoText.classList.remove(TO_DO_DONE_CN);
        toDoText.classList.add(TO_DO_NOT_DONE_CN);
    }
}

function toggleToDoDone(to_do_idx) {
    to_dos[to_do_idx].done = !to_dos[to_do_idx].done;
}

function handleCheckboxChange(e) {
    const changed_checkbox = e.target;
    const list_item = changed_checkbox.parentNode;
    const to_do_id = list_item.id;

    changeToDoTextClassList(changed_checkbox);
    toggleToDoDone(to_do_id - 1);
    saveToDos();
}

function handleDeleteButtonClick(e) {

}

function paintToDo(idx) {
    const to_do_list_item = document.createElement("li");
    to_do_list_item.classList.add(TO_DO_LIST_ITEM_CN);
    to_do_list_item.id = `${idx+1}`;

    const to_do_delete_button = document.createElement("span");
    to_do_delete_button.addEventListener("click", handleDeleteButtonClick);
    to_do_delete_button.classList.add("button");
    to_do_delete_button.innerText= "❌";

    const to_do_text = document.createElement("span");
    to_do_text.classList.add(TO_DO_TEXT_CN);
    to_do_text.innerText = to_dos[idx].text;

    const to_do_checkbox = document.createElement("input");
    to_do_checkbox.type="checkbox";
    to_do_checkbox.checked = ( to_dos[idx].done ? true : false );
   
    to_do_checkbox.addEventListener("change", handleCheckboxChange);

    to_do_list_item.appendChild(to_do_delete_button);
    to_do_list_item.appendChild(to_do_text);
    to_do_list_item.appendChild(to_do_checkbox);

    to_do_list.appendChild(to_do_list_item);

    changeToDoTextClassList(to_do_checkbox);
    return to_do_list_item;
}

function paintToDoList() {
    removeAllChildren(to_do_list);
    for(let i = 0; i < to_dos.length; i++) {
        paintToDo(i);
    }
}

function loadToDos() {
    //local storage 에서 들고와서 전역 to_dos array에 담아야함!
    const loaded_to_dos = localStorage.getItem(TO_DOS_KEY_LS);
    if(loaded_to_dos !== null) {
        const parsed_to_dos = JSON.parse(loaded_to_dos);
        to_dos = parsed_to_dos.map(function(element) {return element}); 
        return true;
    } else {
        return false;
    }
}

function toDOInit() {
    if (loadName()) {            //loadName() in greeting.js (to check if user name is stored in a local storage)
        getToDo();
        if (loadToDos()) {
            paintToDoList();
        }
    }
}

toDOInit();