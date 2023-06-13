let internships = [];
let previousInternship = null;
let previousInternshipDetails = null;
let currentStudentID = 1;


window.addEventListener("load", () => {
    const uploadButton = document.getElementById("uploadBtn");
    uploadButton.addEventListener("click", async () => {
        //await applyForInternship();

    });
});

async function setCurrentUser() {
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
    currentStudentID = Number(getCookie("student"));
    console.log(currentStudentID);
}

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
async function getFirma(id: Number): Promise<any> {
    return await fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET");
}


/*async function showInternships(internships) {
    await setCurrentUser();

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

    const applyButtonContainer = document.createElement("div");
    applyButtonContainer.setAttribute("class", "d-flex justify-content ");

    const applyButton = document.createElement("button");
    applyButton.setAttribute("type", "button");
    applyButton.setAttribute("class", "btn btn-primary");
    applyButton.innerText = "Apply";
    applyButton.setAttribute("data-toggle", "modal");
    applyButton.setAttribute("data-target", "#fileUploadModal");

    applyButtonContainer.append(applyButton, document.getElementById("fileUploadModal"));


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
        applyButtonContainer,
        info
    );
    internshipDetails.append(internshipDetailsContent);


    previousInternshipDetails = internshipDetailsContent;
    previousInternship = internship;
}


async function applyForInternship() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file != null || file != undefined) {
        await uploadFile(file);
    } else {
        alert("Please select a file");
    }
}

async function uploadFile(file): Promise<void> {
    try {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        /*formData.append('internshipId', previousInternship.id.toString());
        formData.append('studentId', "1")

        const responseFile = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data' // Set the correct encoding type
            }
        });

        const resonseBewerbung: boolean = await fetchRestEndpoint('http://localhost:3000/api/bewerber', "POST", {
            praktikumId: previousInternship.id,
            schuelerId: currentStudentID,
            bewerbungFileName: file.name
        });

        if (responseFile && resonseBewerbung) {
            alert("Bewerbung erfolgreich abgeschickt");
            console.log('File uploaded successfully');
        } else {
            throw new Error('Failed to upload file');
        }
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}*/