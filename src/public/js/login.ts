let companyBtn;
let studentBtn;
let loginBtn;
let companyH;
let studentH;
let loginType = null;
let tempHr;
let loginHeader;
let registerBtn;

window.addEventListener("DOMContentLoaded", () => {
    companyBtn = document.getElementById("companyBtn");
    studentBtn = document.getElementById("studentBtn");
    loginBtn = document.getElementById("loginBtn");
    companyH = document.getElementById("company-header");
    studentH = document.getElementById("student-header");
    tempHr = document.getElementById("temp-hr");
    loginHeader = document.getElementById("login-header");
    registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", register);
    loginBtn.addEventListener("click", login);
    companyBtn.addEventListener("click", selectCompany);
    studentBtn.addEventListener("click", selectStudent);
});

async function fetchRestEndpoint(
    route: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object
): Promise<any> {
    let options: any = {method};
    if (data) {
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(data);
    }
    const res = await fetch(route, options);
    if (!res.ok) {
        throw new Error(
            `${method} ${res.url} ${res.status} (${res.statusText})`
        );
    }
    if (res.status !== 204) {
        return await res.json();
    }
}

async function register() {
    if(loginType === "company") {
        window.location.href = "http://localhost:3000/company-register.html";
    }
    else if(loginType === "student") {
        window.location.href = "http://localhost:3000/student-register.html";
    }
    else {
        alert("Please select a login type");
    }
}

function selectCompany() {
    loginHeader.innerText = "Company Login";
    tempHr.classList.add("noDisplay");
    companyH.classList.remove("noDisplay");
    loginType = "company";
    studentBtn.classList.remove("gradient-custom-2");
    studentBtn.classList.add("btnInactive");
    companyBtn.classList.remove("btnInactive");
    companyBtn.classList.add("gradient-custom-2");
    studentH.classList.add("noDisplay");
}

function selectStudent() {
    loginHeader.innerText = "Student Login";
    tempHr.classList.add("noDisplay");
    studentH.classList.remove("noDisplay");
    loginType = "student";
    companyBtn.classList.remove("gradient-custom-2");
    companyBtn.classList.add("btnInactive");
    studentBtn.classList.remove("btnInactive");
    studentBtn.classList.add("gradient-custom-2");
    companyH.classList.add("noDisplay");
}



async function login() {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;

    console.log(email, password);

    if (password === null || email === "") {
        alert("Please fill in all fields");
    } else {
        let loginData = {
            email: email,
            password: password,
        }

        if (loginType === "company") {
            let response;

            try {
                response = await fetchRestEndpoint(
                    `http://localhost:3000/api/firmen/login/try?email=${loginData.email}&passwort=${loginData.password}`,
                    "GET");
            } catch (error) {
                console.log(error);
            }

            if (response) {
                console.log(response);
                window.location.href = "http://localhost:3000/company-dashboard.html";
            } else {
                alert("Login failed");
            }
        } else if (loginType === "student") {
            let response;

            try {
                response = await fetchRestEndpoint(
                    `http://localhost:3000/api/schueler/login/try?email=${loginData.email}&passwort=${loginData.password}`,
                    "GET");
            } catch (error) {
                console.log(error);
            }

            if (response) {
                console.log(response);
                window.location.href = "http://localhost:3000/student-dashboard.html";
            } else {
                alert("Login failed");
            }
        } else {
            alert("Please select a login type");
        }
    }
}