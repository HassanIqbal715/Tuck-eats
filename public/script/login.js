import  * as utils from './utils.js';

async function checkAdminLogin(email, password) {
    let loginCredList = await utils.fetchAdminEmailsAndPasswords();
    if (loginCredList) {
        for (let x of loginCredList) {
            if (x.email.toLowerCase() === email && x.pass === password) {
                return true;
            }
        }
        console.log("Invalid credentials entered.");
        return false;
    }
    else {
        console.log("Not found");
        return false;
    }
}

async function checkUserLogin(email, password) {
    let loginCredList = await utils.fetchUserEmailsAndPasswords();
    if (loginCredList) {
        for (let x of loginCredList) {
            if (x.email.toLowerCase() === email && x.pass === password) {
                return true;
            }
        }
        console.log("Invalid credentials entered.");
        return false;
    }
    else {
        console.log("Not found");
        return false;
    }
}

function createCredentialsError() {
    let invalidEmail = document.createElement("p");
    invalidEmail.classList.add("invalid-input");
    invalidEmail.textContent = "Incorrect or invalid login credentials.";
    invalidInputBox.appendChild(invalidEmail);
}

async function loginClick() {
    let email = emailField.value.toLowerCase();
    if (await checkAdminLogin(email, passwordField.value) == true) {
        invalidInputBox.innerHTML = '';
        window.location.href = "/admin/home/";
    }
    else if (await checkUserLogin(email, passwordField.value) == true) {
        invalidInputBox.innerHTML = '';
        window.location.href = "/user/home/";        
    }
    else {
        invalidInputBox.innerHTML = '';
        createCredentialsError();
    }
}

function registerClick() {
    window.location.href = '/register/';
}

const loginFields = document.querySelector("#login-box-fields");
const buttons = document.querySelector("#login-box-buttons");
const invalidInputBox = document.querySelector("#invalid-input-box");

let emailFieldBox = document.createElement("div");
let passwordFieldBox = document.createElement("div");

let emailField = document.createElement("input");
let passwordField = document.createElement("input");
let forgotPasswordButton = document.createElement("p");
let loginButton = document.createElement("div");
let registerButton = document.createElement("div");

emailFieldBox.classList.add("fieldBox");

passwordFieldBox.classList.add("fieldBox");
passwordFieldBox.style.marginTop = "9.229vh";

emailField.placeholder = " Email";
emailField.classList.add("field");

passwordField.placeholder = " Password";
passwordField.classList.add("field");
passwordField.style.marginTop = "4.644vh";
passwordField.type = "password";

forgotPasswordButton.classList.add("forgotPassword");
forgotPasswordButton.textContent = "Forgot password?";

loginButton.classList.add("button");
loginButton.textContent = "Login";
loginButton.addEventListener("click", loginClick);

registerButton.classList.add("button");
registerButton.textContent = "Register";
registerButton.style.marginTop = "2.5vh";
registerButton.addEventListener("click", registerClick);

loginFields.appendChild(emailFieldBox);
loginFields.appendChild(passwordFieldBox);
loginFields.appendChild(emailField);
loginFields.appendChild(passwordField);
loginFields.appendChild(forgotPasswordButton);

buttons.appendChild(loginButton);
buttons.appendChild(registerButton);