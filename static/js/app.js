var links = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (document.URL.includes(links[i].href)) {
        links[i].style.background = '#e4e4e4';
        break;
    }
}