var dataPath = "/data";
var blogPath = "/partials/blog";
var postPath = "/partials/post";
var alumniDSvc = "https://script.google.com/macros/s/AKfycby04N7LotTrhxNZ8wMPRW9Pskoo2bRt4HnQ3NwECHGpNK1V3Ywg/exec";
var accountsSvc = "https://script.google.com/macros/s/AKfycbzGS-NsFvOXmnWs_SCm16ccWJyiXiYEnsTh5ZV3jbCuvELsYIMD/exec";

$(document).ready(function () {
    if (screen.width < 1024) {
        $('.nav-links').click(function () { $('.mdl-layout__drawer').toggleClass('is-visible'); $('.mdl-layout__obfuscator').toggleClass('is-visible'); });
    }
    $('.demo-layout').height($(document).height());
    $('#alumni_form_msg').hide();
});

window.onload = function () {
    $("#progressBar").hide();
};


function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function close() {
    var d = document.querySelector('.mdl-layout');
    d.MaterialLayout.toggleDrawer();
}

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

    if (_name == undefined || _name == "" || _batch == undefined || _batch == "" || _exams == undefined || _exams == "" || _mobile == undefined || _mobile == "" || _email == undefined || _email == "" || _location == undefined || _location == "" || _profile == undefined || _profile == "" || _organisation == undefined || _organisation == "" || _designation == undefined || _designation == "" || _institute == undefined || _institute == "" || _degree == undefined || _degree == "") {
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

function searchsubmit() {
    $('#alsearch').blur();
    window.location = window.location.href.split('?')[0] + "?q=" + $('#alsearch').val();
    return 0;
}

function pupulateShareLinks() {
    var url = encodeURI(window.location);
    var title = encodeURI(document.title);
    $('#shareFacebook').attr('href', "https://www.facebook.com/dialog/share?app_id=425089481182651&href=" + url + "&t=" + title);
    $('#shareFacebook').attr('target', "new");
    $('#shareTwitter').attr('href', "https://twitter.com/intent/tweet?text=" + title + "&url=" + url);
    $('#shareTwitter').attr('target', "new");
    $('#shareLinkedin').attr('href', "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title);
    $('#shareLinkedin').attr('target', "new");
    $('#shareGoogleplus').attr('href', "https://plus.google.com/share?u=" + url + "&t=" + title);
    $('#shareGoogleplus').attr('target', "new");
}

// Function to retrieve a query string value.
function getQueryStringParameter(paramToRetrive) {
    try {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrive) return singleParam[1];
        }
    }
    catch (e) {
        console.log('No Query Sring Found');
    }
}

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return str;
}

var xTime = getFormattedDate();


var links = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (document.URL.includes(links[i].href)) {
        links[i].style.background = '#e4e4e4';
        break;
    }
}