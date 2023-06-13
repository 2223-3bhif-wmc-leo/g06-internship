let currentCompanyID: Number;
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

async function setCurrentCompany() {
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
    currentCompanyID = Number(getCookie("company"));
    console.log(currentCompanyID);
}

async function loadCompany() {
    await setCurrentCompany();
    const company = await getCompany(currentCompanyID);
    console.log(company);
    await showCompany(company);
}

async function getCompany(id: Number): Promise<any> {
    return await fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET");
}
async function showCompany(company) {
    const nameField = document.getElementById("nameField");
    nameField.setAttribute("value", company.name);

    const emailField = document.getElementById("emailField");
    emailField.setAttribute("value", company.email);

    const descriptionField = document.getElementById("descriptionField");
    descriptionField.setAttribute("value", company.beschreibung);

    const addressField = document.getElementById("addressField");
    addressField.setAttribute("value", company.addresse);

    const phoneField = document.getElementById("phoneField");
    phoneField.setAttribute("value", company.telefon);

    const passwordField = document.getElementById("passwordField");
    passwordField.setAttribute("value", company.passwort);
}

async function updateCompany() {
    const nameField : any = document.getElementById("nameField");
    const emailField : any = document.getElementById("emailField");
    const descriptionField : any = document.getElementById("descriptionField");
    const addressField: any = document.getElementById("addressField");
    const phoneField:any  = document.getElementById("phoneField");
    const passwordField: any = document.getElementById("passwordField");

    const company = {
        name: nameField.value,
        email: emailField.value,
        beschreibung: descriptionField.value,
        adresse: addressField.value,
        telefon: phoneField.value,
        passwort: passwordField.value
    }

    console.log(company);

    const response = await fetchRestEndpoint("http://localhost:3000/api/firmen/" + currentCompanyID, "PUT", company);
    console.log(response);
}