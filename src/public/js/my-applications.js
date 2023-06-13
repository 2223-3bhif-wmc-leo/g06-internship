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
var currentStudent = 1;
var previousInternship = null;
var previousInternshipDetails = null;
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
function loadInternships() {
    return __awaiter(this, void 0, void 0, function () {
        var internshipsDiv, myInternships;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    internshipsDiv = document.getElementById("myInternships");
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/bewerber/schueler/" + currentStudent, "GET")];
                case 1:
                    myInternships = _a.sent();
                    console.log(myInternships);
                    showInternships(myInternships);
                    return [2 /*return*/];
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
function showInternshipDetails(internship) {
    return __awaiter(this, void 0, void 0, function () {
        var previousInternshipCard, internshipCard, internshipDetails, internshipDetailsContent, header, descriptionHeader, descriptionParagraph, requirementsHeader, requirementsParagraph, durationHeader, duractionParagraph, firma, payHeader, payParagraph, revokeInternshipContainer, revokeInternshipBtn, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    header = document.createElement("h1");
                    header.innerText = internship.titel;
                    descriptionHeader = document.createElement("h4");
                    descriptionHeader.innerText = "Beschreibung";
                    descriptionParagraph = document.createElement("p");
                    descriptionParagraph.innerText = internship.beschreibung;
                    requirementsHeader = document.createElement("h4");
                    requirementsHeader.innerText = "Anforderungen";
                    requirementsParagraph = document.createElement("p");
                    requirementsParagraph.innerText = internship.anforderungen;
                    durationHeader = document.createElement("h4");
                    durationHeader.innerText = "Dauer";
                    duractionParagraph = document.createElement("p");
                    duractionParagraph.innerText = internship.dauertage + " Tage";
                    return [4 /*yield*/, getFirma(internship.firma)];
                case 1:
                    firma = _a.sent();
                    payHeader = document.createElement("h6");
                    payHeader.innerText = "Bezahlung";
                    payParagraph = document.createElement("p");
                    if (internship.gehalt != null || internship.gehalt != undefined) {
                        payParagraph.innerText = internship.gehalt + "€";
                    }
                    else {
                        payParagraph.innerText = "-";
                    }
                    revokeInternshipContainer = document.createElement("div");
                    revokeInternshipContainer.setAttribute("class", "d-flex justify-content ");
                    revokeInternshipBtn = document.createElement("button");
                    revokeInternshipBtn.setAttribute("type", "button");
                    revokeInternshipBtn.setAttribute("class", "btn btn-primary");
                    revokeInternshipBtn.innerText = "Bewerbung zurückziehen";
                    revokeInternshipBtn.addEventListener("click", function () {
                        revokeInternship(internship);
                    });
                    revokeInternshipBtn.setAttribute("data-toggle", "modal");
                    revokeInternshipBtn.setAttribute("data-target", "#fileUploadModal");
                    revokeInternshipContainer.append(revokeInternshipBtn, document.getElementById("fileUploadModal"));
                    info = document.createElement("div");
                    info.classList.add("info");
                    info.innerText = "This internship offering was posted on " + internship.aufgegeben + " by " + firma.name;
                    internshipDetailsContent.append(header, descriptionHeader, descriptionParagraph, requirementsHeader, requirementsParagraph, durationHeader, duractionParagraph, payHeader, payParagraph, revokeInternshipContainer, info);
                    internshipDetails.append(internshipDetailsContent);
                    previousInternshipDetails = internshipDetailsContent;
                    previousInternship = internship;
                    return [2 /*return*/];
            }
        });
    });
}
function revokeInternship(internship) {
    return __awaiter(this, void 0, void 0, function () {
        var id, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = internship.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/bewerber/" + id, "DELETE")];
                case 2:
                    res = _a.sent();
                    if (res) {
                        alert("Bewerbung zurückgezogen");
                        location.reload();
                    }
                    else {
                        alert("Bewerbung konnte nicht zurückgezogen werden");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    alert("Bewerbung konnte nicht zurückgezogen werden");
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
