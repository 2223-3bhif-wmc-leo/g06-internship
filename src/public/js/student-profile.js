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
function loadStudent() {
    return __awaiter(this, void 0, void 0, function () {
        var student;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getStudent(1)];
                case 1:
                    student = _a.sent();
                    console.log(student);
                    return [4 /*yield*/, showStudent(student)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/schueler/" + id, "GET")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function showStudent(student) {
    return __awaiter(this, void 0, void 0, function () {
        var nameField, phoneField, addressField, emailField, passwordField;
        return __generator(this, function (_a) {
            nameField = document.getElementById("nameField");
            nameField.setAttribute("value", student.name);
            phoneField = document.getElementById("phoneField");
            phoneField.setAttribute("value", student.telefon);
            addressField = document.getElementById("addressField");
            addressField.setAttribute("value", student.adresse);
            emailField = document.getElementById("emailField");
            emailField.setAttribute("value", student.email);
            passwordField = document.getElementById("passwordField");
            passwordField.setAttribute("value", student.passwort);
            return [2 /*return*/];
        });
    });
}
function updateStudent() {
    return __awaiter(this, void 0, void 0, function () {
        var nameField, phoneField, addressField, emailField, passwordField, student, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameField = document.getElementById("nameField");
                    phoneField = document.getElementById("phoneField");
                    addressField = document.getElementById("addressField");
                    emailField = document.getElementById("emailField");
                    passwordField = document.getElementById("passwordField");
                    student = {
                        name: nameField.getAttribute("value"),
                        telefon: phoneField.getAttribute("value"),
                        adresse: addressField.getAttribute("value"),
                        email: emailField.getAttribute("value"),
                        passwort: passwordField.getAttribute("value")
                    };
                    console.log(student);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/schueler/1", "PUT", student)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
