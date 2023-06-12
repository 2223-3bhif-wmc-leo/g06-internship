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


    console.log(name, email, password, address, phoneNumber);

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

        console.log(registerData);
        response = await fetchRestEndpoint("http://localhost:3000/api/schueler", "POST", registerData);
        console.log(response);
        if (response.status === 201) {
            alert("Successfully registered");
        } else {
            alert("Something went wrong");
        }
    }
}