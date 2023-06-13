let currentStudentID;

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

async function loadStudent() {
    const student = await getStudent(1);
    console.log(student);
    await showStudent(student);
}

async function setCurrentUser() {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    console.log(document.cookie)
    currentStudentID = Number(getCookie("student"));
    console.log(currentStudentID);
}

async function getStudent(id: Number): Promise<any> {
    setCurrentUser();
    return await fetchRestEndpoint("http://localhost:3000/api/schueler/" + currentStudentID, "GET");
}
async function showStudent(student) {
    const nameField = document.getElementById("nameField");
    nameField.setAttribute("value", student.name);

    const phoneField = document.getElementById("phoneField");
    phoneField.setAttribute("value", student.telefon);

    const addressField = document.getElementById("addressField");
    addressField.setAttribute("value", student.adresse);

    const emailField = document.getElementById("emailField");
    emailField.setAttribute("value", student.email);

    const passwordField : any = document.getElementById("passwordField");
    passwordField.value = student.passwort;

    const name = document.getElementById("name");
    name.setAttribute("value", student.name);

    const email = document.getElementById("email");
    email.setAttribute("value", student.email);
}

async function updateStudent() {
    const nameField : any = document.getElementById("nameField");
    const phoneField : any = document.getElementById("phoneField");
    const addressField : any = document.getElementById("addressField");
    const emailField: any = document.getElementById("emailField");
    const passwordField : any = document.getElementById("passwordField");

    const student = {
        name: nameField.value,
        telefon: phoneField.value,
        adresse: addressField.value,
        email: emailField.value,
        passwort: passwordField.value
    }

    console.log(student);

    const response = await fetchRestEndpoint("http://localhost:3000/api/schueler/" +currentStudentID, "PUT", student);
    console.log(response);
    window.location.href = "http://localhost:3000/student-dashboard.html";
}

async function deleteStudent() {
    const response = await fetchRestEndpoint("http://localhost:3000/api/schueler/" + currentStudentID, "DELETE");
    console.log(response);
    window.location.href = "http://localhost:3000/index.html";
}