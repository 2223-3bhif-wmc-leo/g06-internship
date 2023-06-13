"use strict";
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
exports.__esModule = true;
var typescript_cookie_1 = require("typescript-cookie");
var companyBtn;
var studentBtn;
var loginBtn;
var companyH;
var studentH;
var loginType = null;
var tempHr;
var loginHeader;
var registerBtn;
window.addEventListener("DOMContentLoaded", function () {
    companyBtn = document.getElementById("companyBtn");
    studentBtn = document.getElementById("studentBtn");
    loginBtn = document.getElementById("loginBtn");
    companyH = document.getElementById("company-header");
    studentH = document.getElementById("student-header");
    tempHr = document.getElementById("temp-hr");
    loginHeader = document.getElementById("login-header");
    registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", register);
    loginBtn.addEventListener("click", login);
    companyBtn.addEventListener("click", selectCompany);
    studentBtn.addEventListener("click", selectStudent);
});
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
function register() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (loginType === "company") {
                window.location.href = "http://localhost:3000/company-register.html";
            }
            else if (loginType === "student") {
                window.location.href = "http://localhost:3000/student-register.html";
            }
            else {
                alert("Please select a login type");
            }
            return [2 /*return*/];
        });
    });
}
function selectCompany() {
    loginHeader.innerText = "Company Login";
    tempHr.classList.add("noDisplay");
    companyH.classList.remove("noDisplay");
    loginType = "company";
    studentBtn.classList.remove("gradient-custom-2");
    studentBtn.classList.add("btnInactive");
    companyBtn.classList.remove("btnInactive");
    companyBtn.classList.add("gradient-custom-2");
    studentH.classList.add("noDisplay");
}
function selectStudent() {
    loginHeader.innerText = "Student Login";
    tempHr.classList.add("noDisplay");
    studentH.classList.remove("noDisplay");
    loginType = "student";
    companyBtn.classList.remove("gradient-custom-2");
    companyBtn.classList.add("btnInactive");
    studentBtn.classList.remove("btnInactive");
    studentBtn.classList.add("gradient-custom-2");
    companyH.classList.add("noDisplay");
}
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, loginData, response, error_1, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = document.getElementById("email").value;
                    password = document.getElementById("password").value;
                    console.log(email, password);
                    if (!(password === null || email === "")) return [3 /*break*/, 1];
                    alert("Please fill in all fields");
                    return [3 /*break*/, 12];
                case 1:
                    loginData = {
                        email: email,
                        password: password
                    };
                    if (!(loginType === "company")) return [3 /*break*/, 6];
                    response = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/firmen/login/try?email=".concat(loginData.email, "&passwort=").concat(loginData.password), "GET")];
                case 3:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    if (response) {
                        console.log(response);
                        (0, typescript_cookie_1.setCookie)("currentUser", response);
                        window.location.href = "http://localhost:3000/company-dashboard.html";
                    }
                    else {
                        alert("Login failed");
                    }
                    return [3 /*break*/, 12];
                case 6:
                    if (!(loginType === "student")) return [3 /*break*/, 11];
                    response = void 0;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, fetchRestEndpoint("http://localhost:3000/api/schueler/login/try?email=".concat(loginData.email, "&passwort=").concat(loginData.password), "GET")];
                case 8:
                    response = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 10];
                case 10:
                    if (response) {
                        console.log(response);
                        window.location.href = "http://localhost:3000/student-dashboard.html";
                    }
                    else {
                        alert("Login failed");
                    }
                    return [3 /*break*/, 12];
                case 11:
                    alert("Please select a login type");
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
