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
var currentCompanyId;
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
function loadInternships() {
    return __awaiter(this, void 0, void 0, function () {
        var internships;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setCurrentCompany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/praktika/firma/" + currentCompanyId, "GET")];
                case 2:
                    internships = _a.sent();
                    console.log(internships);
                    return [4 /*yield*/, showInternships(internships)];
                case 3:
                    _a.sent();
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
        var listGroup, _loop_1, _i, internships_1, internship;
        return __generator(this, function (_a) {
            listGroup = document.getElementById("list-group");
            _loop_1 = function (internship) {
                var internshipCard = document.createElement("div");
                internshipCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                internshipCard.setAttribute("id", internship.id);
                internshipCard.addEventListener("click", function () { return showInternshipDetails(internship); });
                var internshipCardHeading = document.createElement("div");
                internshipCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");
                var internshipCardTitle = document.createElement("h5");
                internshipCardTitle.classList.add("mb-1");
                internshipCardTitle.innerText = internship.titel;
                listGroup.appendChild(internshipCardTitle);
            };
            for (_i = 0, internships_1 = internships; _i < internships_1.length; _i++) {
                internship = internships_1[_i];
                _loop_1(internship);
            }
            return [2 /*return*/];
        });
    });
}
function showInternshipDetails(internship) {
    return __awaiter(this, void 0, void 0, function () {
        var internshipDetails, internshipDetailsCard, internshipDetailsCardHeader, internshipDetailsCardBody, internshipDetailsCardBodyText, internshipDetailsCardBodyButton;
        return __generator(this, function (_a) {
            internshipDetails = document.getElementById("internship-details");
            internshipDetails.innerHTML = "";
            internshipDetailsCard = document.createElement("div");
            internshipDetailsCard.setAttribute("class", "card");
            internshipDetailsCardHeader = document.createElement("div");
            internshipDetailsCardHeader.setAttribute("class", "card-header");
            internshipDetailsCardHeader.innerText = internship.titel;
            internshipDetailsCardBody = document.createElement("div");
            internshipDetailsCardBody.setAttribute("class", "card-body");
            internshipDetailsCardBodyText = document.createElement("p");
            internshipDetailsCardBodyText.setAttribute("class", "card-text");
            internshipDetailsCardBodyText.innerText = internship.beschreibung;
            internshipDetailsCardBodyButton = document.createElement("button");
            internshipDetailsCardBodyButton.setAttribute("class", "btn btn-primary");
            internshipDetailsCardBodyButton.setAttribute("id", "applyBtn");
            internshipDetailsCardBodyButton.innerText = "Apply";
            internshipDetailsCardBodyButton.addEventListener("click", function () {
                applyForInternship(internship);
            });
            internshipDetailsCardBody.appendChild(internshipDetailsCardBodyText);
            internshipDetailsCardBody.appendChild(internshipDetailsCardBodyButton);
            internshipDetailsCard.appendChild(internshipDetailsCardHeader);
            internshipDetailsCard.appendChild(internshipDetailsCardBody);
            internshipDetails.appendChild(internshipDetailsCard);
            return [2 /*return*/];
        });
    });
}
function applyForInternship(internship) {
    return __awaiter(this, void 0, void 0, function () {
        var application;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    application = {
                        praktikum: internship.id,
                        student: 1,
                        status: "pending"
                    };
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/bewerber/", "POST", application)];
                case 1:
                    _a.sent();
                    alert("You applied for the internship!");
                    return [2 /*return*/];
            }
        });
    });
}
function loadApplications() {
    return __awaiter(this, void 0, void 0, function () {
        var applications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/bewerber/", "GET")];
                case 1:
                    applications = _a.sent();
                    console.log(applications);
                    return [4 /*yield*/, showApplications(applications)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function showApplications(applications) {
    return __awaiter(this, void 0, void 0, function () {
        var listGroup, _loop_2, _i, applications_1, application;
        return __generator(this, function (_a) {
            listGroup = document.getElementById("list-group");
            _loop_2 = function (application) {
                var applicationCard = document.createElement("a");
                applicationCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                applicationCard.setAttribute("id", application.id);
                applicationCard.addEventListener("click", function () { return showApplicationDetails(application); });
                var applicationCardHeading = document.createElement("div");
                applicationCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");
                var applicationCardTitle = document.createElement("h5");
                applicationCardTitle.classList.add("mb-1");
                applicationCardTitle.innerText = application.praktikum.titel;
            };
            for (_i = 0, applications_1 = applications; _i < applications_1.length; _i++) {
                application = applications_1[_i];
                _loop_2(application);
            }
            return [2 /*return*/];
        });
    });
}
function showApplicationDetails(application) {
    return __awaiter(this, void 0, void 0, function () {
        var applicationDetails, applicationDetailsCard, applicationDetailsCardHeader, applicationDetailsCardBody, applicationDetailsCardBodyText, applicationDetailsCardBodyButton;
        return __generator(this, function (_a) {
            applicationDetails = document.getElementById("application-details");
            applicationDetails.innerHTML = "";
            applicationDetailsCard = document.createElement("div");
            applicationDetailsCard.setAttribute("class", "card");
            applicationDetailsCardHeader = document.createElement("div");
            applicationDetailsCardHeader.setAttribute("class", "card-header");
            applicationDetailsCardHeader.innerText = application.praktikum.titel;
            applicationDetailsCardBody = document.createElement("div");
            applicationDetailsCardBody.setAttribute("class", "card-body");
            applicationDetailsCardBodyText = document.createElement("p");
            applicationDetailsCardBodyText.setAttribute("class", "card-text");
            applicationDetailsCardBodyText.innerText = application.praktikum.beschreibung;
            applicationDetailsCardBodyButton = document.createElement("button");
            applicationDetailsCardBodyButton.setAttribute("class", "btn btn-primary");
            applicationDetailsCardBodyButton.setAttribute("id", "acceptBtn");
            applicationDetailsCardBodyButton.innerText = "Accept";
            applicationDetailsCardBodyButton.addEventListener("click", function () {
                acceptApplication(application);
            });
            applicationDetailsCardBody.appendChild(applicationDetailsCardBodyText);
            applicationDetailsCardBody.appendChild(applicationDetailsCardBodyButton);
            applicationDetailsCard.appendChild(applicationDetailsCardHeader);
            applicationDetailsCard.appendChild(applicationDetailsCardBody);
            applicationDetails.appendChild(applicationDetailsCard);
            return [2 /*return*/];
        });
    });
}
function acceptApplication(application) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    application.status = "accepted";
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/bewerber/" + application.id, "PUT", application)];
                case 1:
                    _a.sent();
                    alert("You accepted the application!");
                    return [2 /*return*/];
            }
        });
    });
}
function loadStudents() {
    return __awaiter(this, void 0, void 0, function () {
        var students;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/studenten/", "GET")];
                case 1:
                    students = _a.sent();
                    console.log(students);
                    return [4 /*yield*/, showStudents(students)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function showStudents(students) {
    return __awaiter(this, void 0, void 0, function () {
        var listGroup, _loop_3, _i, students_1, student;
        return __generator(this, function (_a) {
            listGroup = document.getElementById("list-group");
            _loop_3 = function (student) {
                var studentCard = document.createElement("a");
                studentCard.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                studentCard.setAttribute("id", student.id);
                studentCard.addEventListener("click", function () { return showStudentDetails(student); });
                var studentCardHeading = document.createElement("div");
                studentCardHeading.setAttribute("class", "d-flex w-100 justify-content-between");
                var studentCardTitle = document.createElement("h5");
                studentCardTitle.classList.add("mb-1");
                studentCardTitle.innerText = student.name;
            };
            for (_i = 0, students_1 = students; _i < students_1.length; _i++) {
                student = students_1[_i];
                _loop_3(student);
            }
            return [2 /*return*/];
        });
    });
}
function showStudentDetails(student) {
    return __awaiter(this, void 0, void 0, function () {
        var studentDetails, studentDetailsCard, studentDetailsCardHeader, studentDetailsCardBody, studentDetailsCardBodyText;
        return __generator(this, function (_a) {
            studentDetails = document.getElementById("student-details");
            studentDetails.innerHTML = "";
            studentDetailsCard = document.createElement("div");
            studentDetailsCard.setAttribute("class", "card");
            studentDetailsCardHeader = document.createElement("div");
            studentDetailsCardHeader.setAttribute("class", "card-header");
            studentDetailsCardHeader.innerText = student.name;
            studentDetailsCardBody = document.createElement("div");
            studentDetailsCardBody.setAttribute("class", "card-body");
            studentDetailsCardBodyText = document.createElement("p");
            studentDetailsCardBodyText.setAttribute("class", "card-text");
            studentDetailsCardBodyText.innerText = student.email;
            studentDetailsCardBody.appendChild(studentDetailsCardBodyText);
            studentDetailsCard.appendChild(studentDetailsCardHeader);
            studentDetailsCard.appendChild(studentDetailsCardBody);
            studentDetails.appendChild(studentDetailsCard);
            return [2 /*return*/];
        });
    });
}
