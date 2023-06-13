let currentCompanyId;

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
    currentCompanyId = Number(getCookie("company"));
    console.log(currentCompanyId);
}

/*async function loadInternships() {
    await setCurrentCompany();

    const internships = await fetchRestEndpoint("http://localhost:3000/api/praktika/firma/"+currentCompanyId, "GET");
    console.log(internships);
    await showInternships(internships);
}

async function getFirma(id: Number): Promise<any> {
    return await fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET");
}

async function showInternships(internships) {
    let listGroup = document.getElementById("list-group");
    for (const internship of internships) {
        const internshipCard = document.createElement("div");
        internshipCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
        internshipCard.setAttribute("id", internship.id)
        internshipCard.addEventListener("click", () => showInternshipDetails(internship));

        const internshipCardHeading = document.createElement("div");
        internshipCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");

        const internshipCardTitle = document.createElement("h5");
        internshipCardTitle.classList.add("mb-1");
        internshipCardTitle.innerText = internship.titel;
        listGroup.appendChild(internshipCardTitle);
    }
}

async function showInternshipDetails(internship) {
const internshipDetails = document.getElementById("internship-details");
    internshipDetails.innerHTML = "";

    const internshipDetailsCard = document.createElement("div");
    internshipDetailsCard.setAttribute("class", "card");

    const internshipDetailsCardHeader = document.createElement("div");
    internshipDetailsCardHeader.setAttribute("class", "card-header");
    internshipDetailsCardHeader.innerText = internship.titel;

    const internshipDetailsCardBody = document.createElement("div");
    internshipDetailsCardBody.setAttribute("class", "card-body");

    const internshipDetailsCardBodyText = document.createElement("p");
    internshipDetailsCardBodyText.setAttribute("class", "card-text");
    internshipDetailsCardBodyText.innerText = internship.beschreibung;

    const internshipDetailsCardBodyButton = document.createElement("button");
    internshipDetailsCardBodyButton.setAttribute("class", "btn btn-primary");
    internshipDetailsCardBodyButton.setAttribute("id", "applyBtn");
    internshipDetailsCardBodyButton.innerText = "Apply";
    internshipDetailsCardBodyButton.addEventListener("click", () => {
        applyForInternship(internship);
    });

    internshipDetailsCardBody.appendChild(internshipDetailsCardBodyText);
    internshipDetailsCardBody.appendChild(internshipDetailsCardBodyButton);

    internshipDetailsCard.appendChild(internshipDetailsCardHeader);
    internshipDetailsCard.appendChild(internshipDetailsCardBody);

    internshipDetails.appendChild(internshipDetailsCard);
}

async function applyForInternship(internship) {
    const application = {
        praktikum: internship.id,
        student: 1,
        status: "pending"
    };
    await fetchRestEndpoint("http://localhost:3000/api/bewerber/", "POST", application);
    alert("You applied for the internship!");
}

async function loadApplications() {
    const applications = await fetchRestEndpoint("http://localhost:3000/api/bewerber/", "GET");
    console.log(applications);
    await showApplications(applications);
}

async function showApplications(applications) {
    const listGroup = document.getElementById("list-group");
    for (const application of applications) {
        const applicationCard = document.createElement("a");
        applicationCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
        applicationCard.setAttribute("id", application.id)
        applicationCard.addEventListener("click", () => showApplicationDetails(application));

        const applicationCardHeading = document.createElement("div");
        applicationCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");

        const applicationCardTitle = document.createElement("h5");
        applicationCardTitle.classList.add("mb-1");
        applicationCardTitle.innerText = application.praktikum.titel;
    }
}

async function showApplicationDetails(application) {
    const applicationDetails = document.getElementById("application-details");
    applicationDetails.innerHTML = "";

    const applicationDetailsCard = document.createElement("div");
    applicationDetailsCard.setAttribute("class", "card");

    const applicationDetailsCardHeader = document.createElement("div");
    applicationDetailsCardHeader.setAttribute("class", "card-header");
    applicationDetailsCardHeader.innerText = application.praktikum.titel;

    const applicationDetailsCardBody = document.createElement("div");
    applicationDetailsCardBody.setAttribute("class", "card-body");

    const applicationDetailsCardBodyText = document.createElement("p");
    applicationDetailsCardBodyText.setAttribute("class", "card-text");
    applicationDetailsCardBodyText.innerText = application.praktikum.beschreibung;

    const applicationDetailsCardBodyButton = document.createElement("button");
    applicationDetailsCardBodyButton.setAttribute("class", "btn btn-primary");
    applicationDetailsCardBodyButton.setAttribute("id", "acceptBtn");
    applicationDetailsCardBodyButton.innerText = "Accept";
    applicationDetailsCardBodyButton.addEventListener("click", () => {
        acceptApplication(application);
    });

    applicationDetailsCardBody.appendChild(applicationDetailsCardBodyText);
    applicationDetailsCardBody.appendChild(applicationDetailsCardBodyButton);

    applicationDetailsCard.appendChild(applicationDetailsCardHeader);
    applicationDetailsCard.appendChild(applicationDetailsCardBody);

    applicationDetails.appendChild(applicationDetailsCard);
}

async function acceptApplication(application) {
    application.status = "accepted";
    await fetchRestEndpoint("http://localhost:3000/api/bewerber/" + application.id, "PUT", application);
    alert("You accepted the application!");
}

async function loadStudents() {
    const students = await fetchRestEndpoint("http://localhost:3000/api/studenten/", "GET");
    console.log(students);
    await showStudents(students);
}

async function showStudents(students) {
    const listGroup = document.getElementById("list-group");
    for (const student of students) {
        const studentCard = document.createElement("a");
        studentCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
        studentCard.setAttribute("id", student.id)
        studentCard.addEventListener("click", () => showStudentDetails(student));

        const studentCardHeading = document.createElement("div");
        studentCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");

        const studentCardTitle = document.createElement("h5");
        studentCardTitle.classList.add("mb-1");
        studentCardTitle.innerText = student.name;
    }
}

async function showStudentDetails(student) {
    const studentDetails = document.getElementById("student-details");
    studentDetails.innerHTML = "";

    const studentDetailsCard = document.createElement("div");
    studentDetailsCard.setAttribute("class", "card");

    const studentDetailsCardHeader = document.createElement("div");
    studentDetailsCardHeader.setAttribute("class", "card-header");
    studentDetailsCardHeader.innerText = student.name;

    const studentDetailsCardBody = document.createElement("div");
    studentDetailsCardBody.setAttribute("class", "card-body");

    const studentDetailsCardBodyText = document.createElement("p");
    studentDetailsCardBodyText.setAttribute("class", "card-text");
    studentDetailsCardBodyText.innerText = student.email;

    studentDetailsCardBody.appendChild(studentDetailsCardBodyText);

    studentDetailsCard.appendChild(studentDetailsCardHeader);
    studentDetailsCard.appendChild(studentDetailsCardBody);

    studentDetails.appendChild(studentDetailsCard);
}*/
