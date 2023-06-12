
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
            name: this.name,
            email: this.email,
            passwort: this.password,
            adresse: this.address,
            telefon: this.telefon
        }
        let response;

        console.log(registerData);

        try {
            response = await fetchRestEndpoint("http://localhost:3000/api/schueler", "POST", registerData);
        } catch (error) {
            console.log(error);
        }

        if (response) {
            console.log(response);
<<<<<<< HEAD
            alert("Register successful");
=======
            console.log("Register successful");
>>>>>>> 66001a56591afb9585a8b780ef6794d918c23a9b
        } else {
            alert("Register failed");
        }
    }
}