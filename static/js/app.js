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
};

// Function Definitions =========================================

function enableLoader() {
    document.getElementById(DIV_ID_LOADER).classList.remove(CLASS_DISPLAY_NONE);
}

function disableLoader() {
    document.getElementById(DIV_ID_LOADER).classList.add(CLASS_DISPLAY_NONE);
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