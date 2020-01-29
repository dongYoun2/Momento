const user_name_form = document.querySelector(".js-userNameForm"),
    user_name_input = user_name_form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_NAME_KEY_LS = "currentUser";

let user_name;

//for the first time the user types in his or her name
function handleUserNameFormSubmit(e) {
    e.preventDefault();
    saveUserName();
    paintGreeting();
    getToDo();      //in toDo.js file. after user types in his or her name, 
                    //to-do form appears.
}

function saveUserName() {
    user_name = user_name_input.value;
    localStorage.setItem(USER_NAME_KEY_LS, user_name);
}

function getUserName() {
    user_name_form.classList.remove(HIDING_CN);
    user_name_form.classList.add(SHOWING_CN);

    user_name_form.addEventListener("submit", handleUserNameFormSubmit);
}

function paintGreeting() {
    user_name_form.classList.remove(SHOWING_CN);
    user_name_form.classList.add(HIDING_CN);

    greeting.classList.remove(HIDING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${user_name}!`;
}

function loadName() {
    user_name = localStorage.getItem(USER_NAME_KEY_LS);
    
    if(user_name !== null) return true;
    else return false;
}

function greetingInit() {
    if(loadName()) {
        paintGreeting();
    } else {
        getUserName();
    }
}

greetingInit();