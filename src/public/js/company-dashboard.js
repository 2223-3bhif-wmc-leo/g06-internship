var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var currentCompanyId;
window.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadInternships()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function fetchRestEndpoint(route, method, data) {
    return __awaiter(this, void 0, void 0, function () {
        var options, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { method: method };
                    if (data) {
                        options.headers = { "Content-Type": "application/json" };
                        options.body = JSON.stringify(data);
                    }
                    return [4 /*yield*/, fetch(route, options)];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("".concat(method, " ").concat(res.url, " ").concat(res.status, " (").concat(res.statusText, ")"));
                    }
                    if (!(res.status !== 204)) return [3 /*break*/, 3];
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function setCurrentCompany() {
    return __awaiter(this, void 0, void 0, function () {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        return __generator(this, function (_a) {
            console.log(document.cookie);
            currentCompanyId = Number(getCookie("company"));
            console.log(currentCompanyId);
            return [2 /*return*/];
        });
    });
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
function loadInternships() {
    return __awaiter(this, void 0, void 0, function () {
        var internshipsDiv, myInternships;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCurrentCompany();
                    internshipsDiv = document.getElementById("myInternships");
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika/firma/" + currentCompanyId, "GET")];
                case 1:
                    myInternships = _a.sent();
                    console.log(myInternships);
                    showInternships(myInternships);
                    return [2 /*return*/];
            }
        });
    });
}
function getFirma(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function showInternships(internships) {
    return __awaiter(this, void 0, void 0, function () {
        var listGroup, _i, internships_1, internship, internshipCard, internshipCardHeading, internshipCardTitle, internshipCardSmall, firma, internshipCardText, internshipCardSmall2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listGroup = document.getElementById("list-group");
                    _i = 0, internships_1 = internships;
                    _a.label = 1;
                case 1:
                    if (!(_i < internships_1.length)) return [3 /*break*/, 4];
                    internship = internships_1[_i];
                    internshipCard = document.createElement("a");
                    internshipCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                    internshipCard.setAttribute("id", internship.id);
                    internshipCardHeading = document.createElement("div");
                    internshipCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");
                    internshipCardTitle = document.createElement("h5");
                    internshipCardTitle.classList.add("mb-1");
                    internshipCardTitle.innerText = internship.titel;
                    internshipCardSmall = document.createElement("small");
                    internshipCardSmall.innerText = internship.dauertage + " Tage, Posted: " + internship.aufgegeben;
                    return [4 /*yield*/, getFirma(internship.firma)];
                case 2:
                    firma = _a.sent();
                    internshipCardText = document.createElement("p");
                    internshipCardText.classList.add("mb-1");
                    internshipCardText.innerText = firma.name;
                    internshipCardSmall2 = document.createElement("small");
                    internshipCardSmall2.innerText = firma.addresse;
                    internshipCardHeading.append(internshipCardTitle, internshipCardSmall);
                    internshipCard.append(internshipCardHeading, internshipCardText, internshipCardSmall2);
                    listGroup.append(internshipCard);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
