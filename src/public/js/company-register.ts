let companySubmitBtn;

window.addEventListener("DOMContentLoaded", () => {
    companySubmitBtn = document.getElementById("companySubmitBtn");
    companySubmitBtn.addEventListener("click", postCompany);
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

async function postCompany() {
    let name = (<HTMLInputElement>document.getElementById("companyName")).value;
    let email = (<HTMLInputElement>document.getElementById("companyEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("companyPassword")).value;
    let address = (<HTMLInputElement>document.getElementById("companyAddress")).value;
    let phoneNumber = (<HTMLInputElement>document.getElementById("companyPhoneNumber")).value;
    let description = (<HTMLInputElement>document.getElementById("companyDescription")).value;

    if (password === null || email === "" || password === "" || address === "" || phoneNumber === "" || description === "") {
        alert("Please fill in all fields");
    } else {
        let registerData = {
            name: name,
            email: email,
            passwort: password,
            adresse: address,
            telefon: phoneNumber,
            beschreibung: description
        }
        let response;

        try {
            response = await fetchRestEndpoint("http://localhost:3000/api/firmen", "POST", registerData);
        } catch (error) {
            console.log(error);
            if(error.message === "POST http://localhost:3000/api/firmen 406 (Not Acceptable)") {
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