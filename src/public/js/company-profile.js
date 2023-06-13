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
var currentCompanyID;
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
            currentCompanyID = Number(getCookie("company"));
            console.log(currentCompanyID);
            return [2 /*return*/];
        });
    });
}
function loadCompany() {
    return __awaiter(this, void 0, void 0, function () {
        var company;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setCurrentCompany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getCompany(currentCompanyID)];
                case 2:
                    company = _a.sent();
                    console.log(company);
                    return [4 /*yield*/, showCompany(company)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getCompany(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/firmen/" + id, "GET")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function showCompany(company) {
    return __awaiter(this, void 0, void 0, function () {
        var nameField, emailField, descriptionField, addressField, phoneField, passwordField, name, email;
        return __generator(this, function (_a) {
            nameField = document.getElementById("nameField");
            nameField.setAttribute("value", company.name);
            emailField = document.getElementById("emailField");
            emailField.setAttribute("value", company.email);
            descriptionField = document.getElementById("descriptionField");
            descriptionField.setAttribute("value", company.beschreibung);
            addressField = document.getElementById("addressField");
            addressField.setAttribute("value", company.addresse);
            phoneField = document.getElementById("phoneField");
            phoneField.setAttribute("value", company.telefon);
            passwordField = document.getElementById("passwordField");
            passwordField.setAttribute("value", company.passwort);
            name = document.getElementById("name");
            name.setAttribute("value", company.name);
            email = document.getElementById("email");
            email.setAttribute("value", company.email);
            return [2 /*return*/];
        });
    });
}
function updateCompany() {
    return __awaiter(this, void 0, void 0, function () {
        var nameField, emailField, descriptionField, addressField, phoneField, passwordField, company, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameField = document.getElementById("nameField");
                    emailField = document.getElementById("emailField");
                    descriptionField = document.getElementById("descriptionField");
                    addressField = document.getElementById("addressField");
                    phoneField = document.getElementById("phoneField");
                    passwordField = document.getElementById("passwordField");
                    company = {
                        name: nameField.value,
                        email: emailField.value,
                        beschreibung: descriptionField.value,
                        adresse: addressField.value,
                        telefon: phoneField.value,
                        passwort: passwordField.value
                    };
                    console.log(company);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/firmen/" + currentCompanyID, "PUT", company)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
