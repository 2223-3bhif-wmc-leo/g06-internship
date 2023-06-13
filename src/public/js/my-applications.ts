const currentStudent = 1;
let previousInternship = null;
let previousInternshipDetails = null;

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
    console.log(myInternships);
    showInternships(myInternships);
}

async function showInternships(internships) {
    const listGroup = document.getElementById("list-group");
    for (const internship of internships) {
        const internshipCard = document.createElement("a");
        internshipCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
        internshipCard.setAttribute("id", internship.id)
        internshipCard.addEventListener("click", () => showInternshipDetails(internship));

        const internshipCardHeading = document.createElement("div");
        internshipCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");

        const internshipCardTitle = document.createElement("h5");
        internshipCardTitle.classList.add("mb-1");
        internshipCardTitle.innerText = internship.titel;


        const internshipCardSmall = document.createElement("small");
        internshipCardSmall.innerText = internship.dauertage + " Tage, Posted: " + internship.aufgegeben

        const firma = await getFirma(internship.firma);

        const internshipCardText = document.createElement("p");
        internshipCardText.classList.add("mb-1");
        internshipCardText.innerText = firma.name;

        const internshipCardSmall2 = document.createElement("small");
        internshipCardSmall2.innerText = firma.addresse;

        internshipCardHeading.append(internshipCardTitle, internshipCardSmall);
        internshipCard.append(internshipCardHeading, internshipCardText, internshipCardSmall2);
        listGroup.append(internshipCard);
    }
}

async function getFirma(id: Number): Promise<any> {
    return await fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET");
}

async function showInternshipDetails(internship) {
    if (previousInternship != null) {
        const previousInternshipCard = document.getElementById(previousInternship.id);
        previousInternshipCard.classList.remove("active");
    }
    if (previousInternshipDetails != null) {
        previousInternshipDetails.remove();
    }
    const internshipCard = document.getElementById(internship.id);
    internshipCard.classList.add("active");
    const internshipDetails = document.getElementById("internship-details");
    const internshipDetailsContent = document.createElement("div");
    const header = document.createElement("h1");
    header.innerText = internship.titel;

    const descriptionHeader = document.createElement("h4");
    descriptionHeader.innerText = "Beschreibung";
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.innerText = internship.beschreibung;

    const requirementsHeader = document.createElement("h4");
    requirementsHeader.innerText = "Anforderungen";
    const requirementsParagraph = document.createElement("p");
    requirementsParagraph.innerText = internship.anforderungen;


    const durationHeader = document.createElement("h4");
    durationHeader.innerText = "Dauer";
    const duractionParagraph = document.createElement("p");
    duractionParagraph.innerText = internship.dauertage + " Tage";

    const firma = await getFirma(internship.firma);

    const payHeader = document.createElement("h6");
    payHeader.innerText = "Bezahlung";
    const payParagraph = document.createElement("p");

    if (internship.gehalt != null || internship.gehalt != undefined) {
        payParagraph.innerText = internship.gehalt + "€";
    } else {
        payParagraph.innerText = "-";
    }
    //<button type="button" class="btn btn-primary">Primary</button>

    const revokeInternshipContainer = document.createElement("div");
    revokeInternshipContainer.setAttribute("class", "d-flex justify-content ");

    const revokeInternshipBtn = document.createElement("button");
    revokeInternshipBtn.setAttribute("type", "button");
    revokeInternshipBtn.setAttribute("class", "btn btn-primary");
    revokeInternshipBtn.innerText = "Bewerbung zurückziehen";
    revokeInternshipBtn.addEventListener("click", () => {
        revokeInternship(internship);
    });
    revokeInternshipBtn.setAttribute("data-toggle", "modal");
    revokeInternshipBtn.setAttribute("data-target", "#fileUploadModal");
    revokeInternshipContainer.append(revokeInternshipBtn, document.getElementById("fileUploadModal"));


    const info = document.createElement("div");
    info.classList.add("info");
    info.innerText = "This internship offering was posted on " + internship.aufgegeben + " by " + firma.name;


    internshipDetailsContent.append(
        header,
        descriptionHeader,
        descriptionParagraph,
        requirementsHeader,
        requirementsParagraph,
        durationHeader,
        duractionParagraph,
        payHeader,
        payParagraph,
        revokeInternshipContainer,
        info
    );
    internshipDetails.append(internshipDetailsContent);


    previousInternshipDetails = internshipDetailsContent;
    previousInternship = internship;

}


async function revokeInternship(internship) {
    const id = internship.id;

    try {
        const res = await fetchRestEndpoint("http://localhost:3000/api/bewerber/" + id, "DELETE");
        if (res) {
            alert("Bewerbung zurückgezogen");
            location.reload();
        } else {
            alert("Bewerbung konnte nicht zurückgezogen werden");
        }
    } catch (err) {
        alert("Bewerbung konnte nicht zurückgezogen werden");
        console.error(err);
    }
}