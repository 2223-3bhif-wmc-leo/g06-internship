
let studentSubmitBtn;

window.addEventListener("DOMContentLoaded", () => {
    studentSubmitBtn = document.getElementById("studentSubmitBtn");
    studentSubmitBtn.addEventListener("click", postStudent);
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

async function postStudent() {
    let name = (<HTMLInputElement>document.getElementById("studentName")).value;
    let email = (<HTMLInputElement>document.getElementById("studentEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("studentPassword")).value;
    let address = (<HTMLInputElement>document.getElementById("studentAddress")).value;
    let phoneNumber = (<HTMLInputElement>document.getElementById("studentPhoneNumber")).value;

    if (password === null || email === "" || password === "" || address === "" || phoneNumber === "") {
        alert("Please fill in all fields");
    } else {
        let registerData = {
            name: name,
            email: email,
            passwort: password,
            adresse: address,
            telefon: phoneNumber
        }
        let response;

        try {
            response = await fetchRestEndpoint("http://localhost:3000/api/schueler", "POST", registerData);
        } catch (error) {
            console.log(error);
            if(error.message === "POST http://localhost:3000/api/schueler 406 (Not Acceptable)") {
                alert("Email already exists");
            }
        }

        if (response) {
            alert("Register successful");
            window.location.href = "http://localhost:3000/login.html";
        } else {
            if(response !== undefined)
            alert("Register failed");
        }
    }
}