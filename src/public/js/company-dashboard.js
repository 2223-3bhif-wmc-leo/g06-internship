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
var previousInternship = null;
var previousInternshipDetails = null;
window.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
    var createBtn;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadInternships()];
            case 1:
                _a.sent();
                createBtn = document.getElementById("internshipCreateBtn");
                createBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, createInternship()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
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
function createInternship() {
    return __awaiter(this, void 0, void 0, function () {
        var title, duration, salary, reqirements, description, internship, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = document.getElementById("internshipTitle").value;
                    duration = document.getElementById("internshipDuration").value;
                    salary = document.getElementById("internshipSalary").value;
                    reqirements = document.getElementById("internshipRequirements").value;
                    description = document.getElementById("internshipDescription").value;
                    if (!(title === "" || duration === "" || salary === "" || reqirements === "" || description === "")) return [3 /*break*/, 1];
                    alert("Please fill in all fields");
                    return [3 /*break*/, 6];
                case 1:
                    internship = {
                        titel: title,
                        beschreibung: description,
                        dauertage: duration,
                        anforderungen: reqirements,
                        firma: currentCompanyId,
                        gehalt: salary
                    };
                    response = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika", "POST", internship)];
                case 3:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    if (response) {
                        alert("Internship created");
                        window.location.href = "http://localhost:3000/company-dashboard.html";
                    }
                    else {
                        alert("Something went wrong");
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
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
        var internships, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setCurrentCompany()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika/firma/" + currentCompanyId, "GET")];
                case 3:
                    internships = _a.sent();
                    return [4 /*yield*/, showInternships(internships)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getFirma(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET")];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function showInternships(internships) {
    return __awaiter(this, void 0, void 0, function () {
        var listGroup, _loop_1, _i, internships_1, internship;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listGroup = document.getElementById("list-group");
                    _loop_1 = function (internship) {
                        var internshipCard, internshipCardHeading, internshipCardTitle, internshipCardSmall, firma, internshipCardText, internshipCardSmall2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log(internship);
                                    internshipCard = document.createElement("a");
                                    internshipCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                                    internshipCard.setAttribute("id", internship.id);
                                    internshipCard.addEventListener("click", function () { return showInternshipDetails(internship); });
                                    internshipCardHeading = document.createElement("div");
                                    internshipCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");
                                    internshipCardTitle = document.createElement("h5");
                                    internshipCardTitle.classList.add("mb-1");
                                    internshipCardTitle.innerText = internship.titel;
                                    internshipCardSmall = document.createElement("small");
                                    internshipCardSmall.innerText = internship.dauertage + " Tage, Posted: " + internship.aufgegeben;
                                    return [4 /*yield*/, getFirma(internship.firma)];
                                case 1:
                                    firma = _b.sent();
                                    internshipCardText = document.createElement("p");
                                    internshipCardText.classList.add("mb-1");
                                    internshipCardText.innerText = firma.name;
                                    internshipCardSmall2 = document.createElement("small");
                                    internshipCardSmall2.innerText = firma.addresse;
                                    internshipCardHeading.append(internshipCardTitle, internshipCardSmall);
                                    internshipCard.append(internshipCardHeading, internshipCardText, internshipCardSmall2);
                                    listGroup.append(internshipCard);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, internships_1 = internships;
                    _a.label = 1;
                case 1:
                    if (!(_i < internships_1.length)) return [3 /*break*/, 4];
                    internship = internships_1[_i];
                    return [5 /*yield**/, _loop_1(internship)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function showInternshipDetails(internship) {
    return __awaiter(this, void 0, void 0, function () {
        var previousInternshipCard, internshipCard, internshipDetails, internshipDetailsContent, btnDiv, internshipDeleteBtn, internshipUpdateBtn;
        return __generator(this, function (_a) {
            if (previousInternship != null) {
                previousInternshipCard = document.getElementById(previousInternship.id);
                previousInternshipCard.classList.remove("active");
            }
            if (previousInternshipDetails != null) {
                previousInternshipDetails.remove();
            }
            internshipCard = document.getElementById(internship.id);
            internshipCard.classList.add("active");
            internshipDetails = document.getElementById("internship-details");
            internshipDetailsContent = document.createElement("div");
            internshipDetails.innerHTML = "<section class=\"vh-100 gradient-custom w-100\">\n" +
                "                    <div class=\"container-12 h-100 w-100\">\n" +
                "                        <div class=\"row justify-content-center align-items-center w-100 h-100\">\n" +
                "                            <div class=\"col-12 col-lg-9 col-xl-7\">\n" +
                "                                <div class=\"card shadow-2-strong card-registration\" style=\"border-radius: 15px;\">\n" +
                "                                    <div class=\"card-body p-4 p-md-5\">\n" +
                "                                        <h3 class=\"mb-4 pb-2 pb-md-0 mb-md-5\">Update</h3>\n" +
                "                                        <form>\n" +
                "                                            <div class=\"row\">\n" +
                "                                                <div class=\"col-md-6 mb-4\">\n" +
                "                                                    <div class=\"form-outline\">\n" +
                "                                                        <label class=\"form-label\" for=\"updateInternshipTitle\">Title</label>\n" +
                "                                                        <input type=\"text\" id=\"updateInternshipTitle\" class=\"form-control form-control-md\" />\n" +
                "                                                    </div>\n" +
                "                                                </div>\n" +
                "                                                <div class=\"col-md-6 mb-4\">\n" +
                "\n" +
                "                                                    <div class=\"form-outline w-100\">\n" +
                "                                                        <label for=\"updateInternshipDuration\" class=\"text\">Duration</label>\n" +
                "                                                        <input type=\"number\" class=\"form-control form-control-md\" id=\"updateInternshipDuration\" />\n" +
                "                                                    </div>\n" +
                "\n" +
                "                                                </div>\n" +
                "                                            </div>\n" +
                "                                            <div>\n" +
                "                                                <label for=\"updateInternshipSalary\">Salary</label>\n" +
                "                                                <input type=\"number\" id=\"updateInternshipSalary\" class=\"form-control form-control-md\" />\n" +
                "                                            </div>\n" +
                "                                            <div>\n" +
                "                                                <label for=\"updateInternshipRequirements\">Requirements</label>\n" +
                "                                                <textarea id=\"updateInternshipRequirements\" class=\"form-control form-control-md\"  rows=\"4\"></textarea>\n" +
                "                                            </div>\n" +
                "                                            <div>\n" +
                "                                                <label for=\"updateInternshipDescription\">Description</label>\n" +
                "                                                <textarea id=\"updateInternshipDescription\" class=\"form-control form-control-md\"  rows=\"4\"></textarea>\n" +
                "                                            </div>\n" +
                "\n" +
                "                                            <div id='btnDiv' class=\"mt-4 pt-2\">\n" +
                "                                                <input class=\"btn btn-primary btn-lg\" type=\"button\" value=\"Update\" id=\"internshipUpdateBtn\"/>\n" +
                "                                            </div>\n" +
                "                                        </form>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </section>";
            setInternshipDetails(internship);
            btnDiv = document.getElementById("btnDiv");
            internshipDeleteBtn = document.createElement("button");
            internshipDeleteBtn.classList.add("btn", "btn-danger", "btn-lg", "me-2");
            internshipDeleteBtn.addEventListener("click", function () { return deleteInternship(internship.id); });
            internshipDeleteBtn.innerText = "Delete";
            btnDiv.append(internshipDeleteBtn);
            internshipUpdateBtn = document.getElementById("internshipUpdateBtn");
            internshipUpdateBtn.addEventListener("click", function () { return updateInternship(); });
            //console.log(internship);
            previousInternshipDetails = internshipDetailsContent;
            previousInternship = internship;
            return [2 /*return*/];
        });
    });
}
function setInternshipDetails(internship) {
    var internshipTitle = document.getElementById("updateInternshipTitle");
    var internshipDuration = document.getElementById("updateInternshipDuration");
    var internshipSalary = document.getElementById("updateInternshipSalary");
    var internshipRequirements = document.getElementById("updateInternshipRequirements");
    var internshipDescription = document.getElementById("updateInternshipDescription");
    internshipTitle.setAttribute("value", internship.titel);
    internshipDuration.setAttribute("value", internship.dauertage);
    internshipSalary.setAttribute("value", internship.gehalt);
    internshipRequirements.textContent = internship.anforderungen;
    internshipDescription.textContent = internship.beschreibung;
}
function updateInternship() {
    return __awaiter(this, void 0, void 0, function () {
        var internshipTitle, internshipDuration, internshipSalary, internshipRequirements, internshipDescription, internship, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    internshipTitle = document.getElementById("updateInternshipTitle");
                    internshipDuration = document.getElementById("updateInternshipDuration");
                    internshipSalary = document.getElementById("updateInternshipSalary");
                    internshipRequirements = document.getElementById("updateInternshipRequirements");
                    internshipDescription = document.getElementById("updateInternshipDescription");
                    internship = {
                        titel: internshipTitle.value,
                        dauertage: internshipDuration.value,
                        gehalt: internshipSalary.value,
                        anforderungen: internshipRequirements.value,
                        beschreibung: internshipDescription.value,
                        firma: currentCompanyId
                    };
                    console.log(internship);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika/" + currentCompanyId, "PUT", internship)];
                case 2:
                    _a.sent();
                    window.location.reload();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    alert("Error updating internship");
                    console.log(e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteInternship(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika/" + id, "DELETE")];
                case 1:
                    _a.sent();
                    window.location.reload();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
