import {ISchueler} from "../../models/model";

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
async function showStudent(student: ISchueler) {
    const studentCard = document.getElementById("student-card");
    const studentCardHeading = document.createElement("div");
    studentCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");

    const studentCardTitle = document.createElement("h5");
    studentCardTitle.classList.add("mb-1");
    studentCardTitle.innerText = student.name;

    const studentCardText = document.createElement("p");
    studentCardText.classList.add("mb-1");
    studentCardText.innerText = student.email;

    studentCardHeading.appendChild(studentCardTitle);
    studentCardHeading.appendChild(studentCardText);
    studentCard.appendChild(studentCardHeading);
}