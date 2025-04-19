import  { fetchUser, fetchUserCount } from './utils.js';
const username = document.querySelector("#field-username");
const firstname = document.querySelector("#field-firstname");
const lastname = document.querySelector("#field-lastname");
const day = document.querySelector("#field-day");
const month = document.querySelector("#field-month");
const year = document.querySelector("#field-year");
const email = document.querySelector("#field-email");
const password = document.querySelector("#field-password");

const register = document.querySelector("#button-register"); 
const login = document.querySelector("#login");

let dateOfBirth;

function createError(text, target) {
    let erro = document.createElement("p");
    erro.classList.add("invalid-input");
    erro.textContent = text;
    erro.setAttribute("style", "margin-top: 0; margin-bottom: 0;");
    console.log(target);
    const box = document.querySelector(target);
    box.innerHTML = '';
    box.appendChild(erro);
}

function clearError(target) {
    const erro = document.querySelector(target);
    erro.innerHTML = '';
}

function checkDate() {
    if (day.value === "" || month.value === "" || year.value === "") {
        createError("Date field left empty", "#invalid-date-box");
        return false;
    }

    const dayInt = parseInt(day.value);
    const monthInt = parseInt(month.value);
    const yearInt = parseInt(year.value);

    if (
        (isNaN(dayInt) || dayInt.toString() != dayInt) ||
        (isNaN(monthInt) || monthInt.toString() != monthInt) ||
        (isNaN(yearInt) || yearInt.toString() != yearInt)
    ) {
        createError("Please enter a valid integer", "#invalid-date-box");
        return false;
    }

    const date = new Date(yearInt, monthInt - 1, dayInt);
    const current_date = new Date();
    console.log(date.getFullYear(), date.getMonth(), date.getDate());
    if (
        date.getFullYear() === yearInt &&
        date.getMonth() === monthInt - 1 &&
        date.getDate() === dayInt
    ) {
        if (date > current_date) {
            createError("Future date entered", "#invalid-date-box");
            return false;
        }
        else {
            clearError("#invalid-date-box");
            dateOfBirth = date;
            return true;
        }
    }
    else {
        createError("Date out of bounds", "#invalid-date-box");
        return false;
    }
}

function checkNames() {
    if (firstname.value === "" || lastname.value === "") {
        createError("Name field left empty.", "#invalid-name-box");
        return false;
    }
    clearError("#invalid-name-box");
    return true;
}

async function checkUsername() {
    if (username.value === "") {
        createError("Username field left empty.", "#invalid-username-box");
        return false;
    }    
    
    if (username.value.length < 3) {
        createError(
            "Username must contain atleast 3 letters",
            "#invalid-username-box"
        );
        return false;
    }

    if (username.value.length > 16) {
        createError(
            "Username must contain atmost 16 letters",
            "#invalid-username-box"
        );
        return false;
    }

    if (!/^[a-zA-Z_]/.test(username.value)) {
        createError(
            "Username must start with an alphabet or '_",
            "#invalid-username-box"
        );
        return false;
    }

    let userList = await fetchUser();

    if (userList) {
        for (let x of userList) {
            if (x.username === username.value) {
                createError("User already exists.", "#invalid-username-box");
                return false;
            }
        }
    }
    else {
        console.log("Error fetching users...");
        return false;
    }

    clearError("#invalid-username-box");
    return true;
}

async function checkEmail() {
    if (email.value === "") {
        createError("Email field left empty.", "#invalid-email-box");
        return false;
    }

    if (!(email.value.includes("@") && email.value.endsWith(".com"))) {
        createError("Invalid email format.", "#invalid-email-box");
        return false;
    }

    let userList = await fetchUser();

    if (userList) {
        for (let x of userList) {
            if (x.email.toLowerCase() === email.value.toLowerCase()) {
                createError("Email already exists.", "#invalid-email-box");
                return false;
            }
        }
    }
    else {
        console.log("Error fetching userList...");
        return false;
    }

    clearError("#invalid-email-box");
    return true;
}

function checkPassword() {
    if (password.value === "") {
        createError("Password field left empty.", "#invalid-password-box");
        return false;
    }

    if (password.value.length < 8) {
        createError(
            "Password must contain atleast 8 letters.",
            "#invalid-password-box"
        );
        return false;
    }

    if (password.value.length > 32) {
        createError(
            "Password must contain atmost 32 letters",
            "#invalid-password-box"
        );
        return false;
    }

    clearError("#invalid-password-box");
    return true;
}

async function checkValues() {
    if (
        checkNames() == true &
        checkDate() == true &
        await checkUsername() == true &
        await checkEmail() == true &
        checkPassword() == true
    )
    {
        let user_ID = await fetchUserCount();
        console.log(user_ID);
        const newCustomer = {
            id: parseInt(user_ID) + 1,
            username: username.value,
            fname: firstname.value,
            lname: lastname.value,
            date_of_birth: dateOfBirth,
            email: email.value,
            password: password.value
        };
        await insertCustomer(newCustomer);

        // window.location.href = '/home/';
    }
}

async function insertCustomer(customerData) {
    const response = await fetch('/insert-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });
}

register.addEventListener("click", checkValues);
login.addEventListener("click", () => {
    window.location.href = '/login/';
})