window.onload = function () {
    var links = document.getElementById("leftNav").getElementsByTagName('a');
    Array.from(links).forEach(link => {
        if (document.URL.includes(link.href)) {
            link.style.background = '#e4e4e4';
        }
    });
};