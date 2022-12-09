const DIV_ID_LOADER = 'loader';
const DIV_ID_LEFT_NAV = 'leftNav';
const DIV_ID_CORNER_NAV = 'cornerNav';
const DIV_ID_ACCOUNTS_LOGS = 'accountLogs';
const CLASS_DISPLAY_NONE = 'hide';
const ACCOUNTS_API = 'https://jnvsitamarhi.org/JsonData/accounts.json';

window.onload = function () {
    // Highlight navigation
    highlightNavigation();

    if (document.URL.includes('accounts.html')) {
        enableLoader();
        fetchDataFromCDN(ACCOUNTS_API)
            .then((data) => {
                var htmlElements = buildHTMLForAccountLogs(data);
                document.getElementById('accountLogs').appendChild(htmlElements);
                disableLoader();
            });
    }

    if (document.URL.includes('index.html') || document.URL.includes('/search')) {
        updateLinkShowAllPosts();
    }
};

// Function Definitions =========================================

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return str;
}

function enableLoader() {
    document.getElementById(DIV_ID_LOADER).classList.remove(CLASS_DISPLAY_NONE);
}

function disableLoader() {
    document.getElementById(DIV_ID_LOADER).classList.add(CLASS_DISPLAY_NONE);
}

function updateLinkShowAllPosts() {
    Array.from(document.getElementsByTagName('a')).forEach((a) => {
        if (a.innerText == 'Show all posts') {
            a.href = window.location.origin + '/index.html';
        }
    });
}

function highlightNavigation() {
    var leftNavLinks = document.getElementById(DIV_ID_LEFT_NAV).getElementsByTagName('a');
    var cornerNavLinks = document.getElementById(DIV_ID_CORNER_NAV).getElementsByTagName('a');
    var links = Array.from(leftNavLinks).concat(Array.from(cornerNavLinks));
    links.forEach(link => {
        if (document.URL.includes(link.href)) {
            link.style.background = '#e0e0e0';
        }
    });
}

function getReadableDate(isoDateString) {
    date = new Date(isoDateString);
    var result = date.toLocaleString('default', { month: 'short' }) + " " + date.getDate() + ", " + date.getFullYear();
    return result;
};

function fetchDataFromCDN(apiUrl) {
    return fetch(apiUrl)
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
                return null;
            })
        });
}

function buildHTMLForAccountLogs(data) {
    var tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>By</th>
            <th>Purpose</th>
        </tr>
        `;
    var tableBody = document.createElement('tbody');
    Array.from(data).forEach(item => {
        if (item.Credit > 0) {
            item.IconName = '+ ₹';
            item.StyleClass = 'credit';
            item.Transaction = item.Credit
        }
        else {
            item.IconName = '- ₹';
            item.StyleClass = 'debit';
            item.Transaction = item.Debit
        }
        var itemElement = document.createElement('tr');
        itemElement.innerHTML = `
            <td>${getReadableDate(item.Date)}</td>
            <td>${item.IconName}${item.Transaction}</td>
            <td>${item.TransactedBy}</td>
            <td>${item.Description}</td>
             `;
        tableBody.appendChild(itemElement);
    });
    var table = document.createElement('table');
    table.setAttribute('class', 'mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp');
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    return table;
}

// ANGULAR JS =========================================

var MainApp = angular.module('MainApp', ['MainAppControllers']);
var MainAppControllers = angular.module('MainAppControllers', []);

function searchsubmit() {
    $('#alsearch').blur();
    window.location = window.location.href.split('?')[0] + "?q=" + $('#alsearch').val();
    return 0;
}

// ALUMNI SEARCH ------------------

var alumniDSvc = "https://jnvsitamarhi.org/JsonData/alumni.json";


MainAppControllers.controller('SearchCtrl', function ($scope, $http) {
    var queryStrings = window.location.search;
    var params = new URLSearchParams(queryStrings);
    var searchText = params.get('q');
    var xTime = getFormattedDate();
    
    if(searchText) {        
        $scope.searchString = decodeURI(searchText);        
    }
    else {
        $scope.searchString = "";
    }
    $scope.loaded = false;
    var serviceURL = alumniDSvc + "?x=" + xTime;
    $http({
        method: 'GET',
        url: serviceURL
    }).then(function (response) {
        $scope.items = response.data;
        $scope.loaded = true;
    }, function (error) {
        console.log("No data found. Error details: " + error + "");
    });
});


// ALUMNI FORM ------------------

function profileSelection() {
    $('#alumni_form_msg').hide();
    $('#frm_org').hide();
    $('#frm_dsg').hide();
    $('#frm_ins').hide();
    $('#frm_deg').hide();
    $("#alumni_form_msg").click(function () {
        $('#alumni_form').show();
        $('#alumni_form_msg').hide();
    });
    $("#entry_1072180231").change(function () {
        var x = $('#entry_1072180231').val();
        if (x == 'Student') {
            $('#entry_1601452556').val("");
            $('#entry_1485639544').val("");
            $('#entry_1096792936').val("NA");
            $('#entry_645748317').val("NA");
            $('#frm_ins').show();
            $('#frm_deg').show();
            $('#frm_org').hide();
            $('#frm_dsg').hide();
        }
        else {
            $('#entry_1096792936').val("");
            $('#entry_645748317').val("");
            $('#entry_1601452556').val("NA");
            $('#entry_1485639544').val("NA");
            $('#frm_org').show();
            $('#frm_dsg').show();
            $('#frm_ins').hide();
            $('#frm_deg').hide();
        }
    });
}

function capitalize(textboxid, str) {
    var output = str.replace(/([^\W_]+[^\s.-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    document.getElementById(textboxid).value = output;
}

function validateForm() {
    var _name = $('#entry_2059521736').val();
    var _batch = $('#entry_23321339').val();
    var _exams = $('#entry_2020491004').val();
    var _mobile = $('#entry_219439507').val();
    var _email = $('#entry_2110054454').val();
    var _location = $('#entry_2022448842').val();
    var _profile = $('#entry_1072180231').val();
    var _organisation = $('#entry_1096792936').val();
    var _designation = $('#entry_645748317').val();
    var _institute = $('#entry_1601452556').val();
    var _degree = $('#entry_1485639544').val();
    var _social = $('#entry_1146134730').val();

    if (_name == undefined || _name == "" || _batch == undefined || _batch == "" || _exams == undefined || _exams == "" || _mobile == undefined || _mobile == "" || _email == undefined || _email == "" || _location == undefined || _location == "" || _profile == undefined || _profile == "" || _organisation == undefined || _organisation == "" || _designation == undefined || _designation == "" || _institute == undefined || _institute == "" || _degree == undefined || _degree == "" || _social == "") {
        alert('Somethimg went wrong !! Refresh the page.');
        document.getElementById('ss-form').reset();
        location.reload();
        return false;
    }
    else {
        submitted = true;
    }
}

function alumniFormSuccess() {
    document.getElementById('ss-form').reset();
    $('#alumni_form').hide();
    $('#alumni_form_msg').show();
}

function alumniFormFailure() {
    alert('Somethimg went wrong !! Refresh the page.');
}
