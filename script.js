"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
console.log('cdn active');
var testStorage = function (typeStorage) {
    try {
        var storage = window[typeStorage];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
var sessionLandingPage, pageHistory, lead = {};
var href = window.location.href;
var pathname = window.location.pathname;
var domain = window.location.hostname;
var paramsRaw = window.location.search;
var params = new URLSearchParams(paramsRaw);
var utmSource = params.get('utm_source') || '';
var utmMedium = params.get('utm_medium') || '';
var utmCampaign = params.get('utm_campaign') || '';
if (testStorage('sessionStorage')) {
    (!sessionStorage.getItem("utmSource")) ? sessionStorage.setItem('utmSource', utmSource) : '';
    (!sessionStorage.getItem("utmMedium")) ? sessionStorage.setItem('utmMedium', utmMedium) : '';
    (!sessionStorage.getItem("utmCampaign")) ? sessionStorage.setItem('utmCampaign', utmCampaign) : '';
}
var setSessionlandingPage = function () {
    if (testStorage('sessionStorage')) {
        sessionLandingPage = sessionStorage.getItem("sessionLandingPage");
        (!sessionLandingPage) ? sessionStorage.setItem("sessionLandingPage", domain + pathname) : '';
        var setSessionLandingPageInInput = function () {
            var landingpageInputs = document.querySelectorAll('.form-lp');
            landingpageInputs.forEach(function (input) { return input.value = sessionLandingPage; });
        };
        (window.innerWidth > 0 && document.querySelector('.form-lp')) ? setSessionLandingPageInInput() : '';
    }
    ;
    lead['crm'] = {};
    lead.crm['landingPage'] = sessionLandingPage;
};
var setUserPagesHistory = function () {
    if (testStorage('localStorage')) {
        var pageHistoryFromLocalStorage = localStorage.getItem('pageHistory');
        pageHistory = JSON.parse(pageHistoryFromLocalStorage);
        if (pageHistory) {
            pageHistory.unshift(pathname);
            var lastTenpageHistory = pageHistory.slice(0, 10);
            localStorage.setItem('pageHistory', JSON.stringify(lastTenpageHistory));
            pageHistory = lastTenpageHistory;
        }
        else {
            localStorage.setItem('pageHistory', JSON.stringify([pathname]));
            pageHistory = [pathname];
        }
        var setpageHistoryInInput = function () {
            pageHistory.forEach(function (elem, index) {
                var input = document.querySelector(".form-pagehistory-".concat(index + 1));
                input.value = elem;
            });
        };
        (window.innerWidth > 0 && document.querySelector('.form-pagehistory-1')) ? setpageHistoryInInput() : '';
        lead['pageHistory'] = pageHistory;
    }
    ;
};
var ipstackAPI = 'df5bdd24829ff43d61cc03990c075ef2';
var ipstackURL = "https://api.ipstack.com/check/?access_key=".concat(ipstackAPI);
var apiData;
var getApiData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var responseRaw, ApiResp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!!apiData) return [3, 3];
                return [4, fetch(ipstackURL)];
            case 1:
                responseRaw = _a.sent();
                return [4, responseRaw.json()];
            case 2:
                ApiResp = _a.sent();
                (typeof (ApiResp) == 'object') ? apiData = ApiResp : '';
                lead['api'] = apiData;
                _a.label = 3;
            case 3: return [3, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3, 5];
            case 5:
                addDataToInputs();
                return [2];
        }
    });
}); };
var addDataToInputs = function () {
    var ubic = "".concat(apiData.city, ", ").concat(apiData.region_name, ", ").concat(apiData.country_name);
    if (document.querySelector('.form-ubic')) {
        var inputUbic = document.querySelectorAll('.form-ubic');
        inputUbic.forEach(function (input) {
            input.value = ubic;
        });
    }
    var inputFullname = (document.querySelector('input[name="fullname"]'));
    var inputFname = (document.querySelector('input[name="fname"]'));
    var inputLname = (document.querySelector('input[name="lname"]'));
    if (inputFullname && inputFname && inputLname) {
        var nameArray = inputFullname.value.split(" ");
        var lastName = (nameArray.slice(1, nameArray.length + 1)).join(' ');
        inputFname.value = nameArray[0].trim();
        inputLname.value = lastName.trim();
    }
};
var setFormDataToLead = function (event) {
    lead.form = {};
    event.detail.inputs.forEach(function (input) {
        lead.form[input.name] = input.value;
    });
    sendLeadToCRM();
};
var inputs = document.querySelectorAll('.wpcf7-form-control');
if (inputs.length > 0 && window.innerWidth > 0) {
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            getApiData();
        });
    });
    document.addEventListener('wpcf7mailsent', setFormDataToLead, false);
}
var sendLeadToCRM = function () { return __awaiter(void 0, void 0, void 0, function () {
    var currencyGuidData, a_1, websites, apiFlow, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currencyGuidData = [
                    { name: 'Euro', guid: '738427c2-15f3-e911-a819-000d3aba90f9' },
                    { name: 'US Dollar', guid: 'f3bbb389-e20a-ea11-a811-000d3ab701f8' }
                ];
                if (lead.api.currency.name) {
                    currencyGuidData.forEach(function (currency) {
                        (lead.api.currency.name == currency.name) ? lead.crm['currencyGuid'] = currency.guid : '';
                    });
                }
                ;
                if (lead.pageHistory) {
                    a_1 = [];
                    lead.pageHistory.forEach(function (elem, index) {
                        var e = "".concat(index + 1, ". ").concat(elem);
                        a_1.push(e);
                    });
                    lead.crm['pageHistory'] = a_1.join('\n');
                }
                ;
                websites = ['comunycarse', 'ecomfax', 'recordia', 'cloudworldwideservices'];
                websites.forEach(function (web) {
                    (domain.includes(web)) ? lead.crm['theme'] = web : '';
                });
                lead.crm['utmSource'] = sessionStorage.getItem("utmSource") || '';
                lead.crm['utmMedium'] = sessionStorage.getItem("utmMedium") || '';
                lead.crm['utmCampaign'] = sessionStorage.getItem("utmCampaign") || '';
                lead.crm['leadOrigin'] = 'Dpto. de Marketing';
                lead.crm = __assign(__assign({}, lead.crm), { firstname: lead.form.fname || '', lastname: lead.form.lname || '', email: lead.form.email || '', phone: lead.form.phone || '', comments: lead.form.comments || '', company: lead.form.company || '', job: lead.form.job || '', city: lead.api.city || '', zip: lead.api.zip || '', region: lead.api.region_name || '', country: lead.api.country_name || '', owner: '951c4e24-e2f3-e911-a811-000d3ab61098', uip: lead.api.ip || '', website: domain || '', leadGeneratedFrom: domain + pathname || '' });
                apiFlow = "https://prod-87.westeurope.logic.azure.com/workflows/42427cf91fa146d4b26fded08e5df4de/triggers/manual/paths/invoke/leadToCrm?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qc6dFzNlBS3lzcyQiuOLjKk32fhoyt_ab5JkIkDIUbE";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, fetch(apiFlow, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(lead.crm)
                    })];
            case 2:
                _a.sent();
                sendLeadToDataBase();
                return [3, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
firebase.initializeApp({
    apiKey: "AIzaSyCzHO8J6xRErJST5YDEuE8cN_6m-EpLRTo",
    authDomain: "lead-manager-pozuelo.firebaseapp.com",
    projectId: "lead-manager-pozuelo",
});
var db = firebase.firestore();
var dataForm = {};
var timestamp, today, month, year, source, currentUrl;
var sendLeadToDataBase = function () {
    timestamp = new Date().getTime();
    today = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Madrid' });
    month = new Date().toLocaleString('en-US', { month: 'long', timeZone: 'Europe/Madrid' });
    year = new Date().toLocaleString('en-US', { year: 'numeric', timeZone: 'Europe/Madrid' });
    var leadToDB = __assign(__assign({}, lead), { status: 0, createDate: today, timestamp: timestamp, source: domain });
    db.collection("leads-".concat(year, "-").concat(month)).add(leadToDB).then(function () {
        goThanksPage();
    }).catch(function (err) { return console.error(err); });
};
var goThanksPage = function () {
    var websitesWithThanksPage = ['ecomfax', 'recordia'];
    var isDownload = document.querySelector('#download-form') || false;
    websitesWithThanksPage.forEach(function (web) {
        if (domain.includes(web)) {
            if (isDownload) {
                if (pathname.includes("/es/")) {
                    window.location.href = "/es/gracias-download/";
                }
                else {
                    window.location.href = "/en/thanks-download/";
                }
                ;
            }
            else {
                if (pathname.includes("/es/")) {
                    window.location.href = "/es/gracias/";
                }
                else {
                    window.location.href = "/en/thanks/";
                }
                ;
            }
        }
    });
};
setSessionlandingPage();
setUserPagesHistory();
