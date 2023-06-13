const currentStudent = 1;
window.addEventListener("load", async () => {
   await loadInternships();
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

async function loadInternships() {
    const internshipsDiv = document.getElementById("myInternships");
    const myInternships = await fetchRestEndpoint("http://localhost:3000/api/bewerber/schueler/" + currentStudent, "GET");

    for (const internship of myInternships) {
        const internshipCard = document.createElement("div");
        internshipCard.innerText = internship.titel;
        internshipsDiv.appendChild(internshipCard);
    }
    console.log(myInternships);
}