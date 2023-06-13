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

async function getStudent(id: Number): Promise<any> {
    return await fetchRestEndpoint("http://localhost:3000/api/schueler/" + id, "GET");
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

    const passwordField = document.getElementById("passwordField");
    passwordField.setAttribute("value", student.passwort);
}

async function updateStudent() {
    const nameField = document.getElementById("nameField");
    const phoneField = document.getElementById("phoneField");
    const addressField = document.getElementById("addressField");
    const emailField = document.getElementById("emailField");
    const passwordField = document.getElementById("passwordField");

    const student = {
        name: nameField.getAttribute("value"),
        telefon: phoneField.getAttribute("value"),
        adresse: addressField.getAttribute("value"),
        email: emailField.getAttribute("value"),
        passwort: passwordField.getAttribute("value")
    }

    console.log(student);

    const response = await fetchRestEndpoint("http://localhost:3000/api/schueler/1", "PUT", student);
    console.log(response);
}