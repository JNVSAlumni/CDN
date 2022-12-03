const DIV_ID_BLOG_POST = 'posts';
const DIV_ID_LOADER = 'loader';
const DIV_ID_LEFT_NAV = 'leftNav';
const DIV_ID_CORNER_NAV = 'cornerNav';
const CLASS_DISPLAY_NONE = 'hide';
const BLOG_POSTS_URL = '/feeds/posts/summary?alt=json&amp;max-results=99999';
const DEFAULT_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMpttITxDuksIpdAgTj-NMgEZS2ya5C7HB9iMjz1G8dkbdWE074s_1l2RG6qthkmAeXxFBO-Y6vRE6Copah3D8YXeeDlx5Vq-MWHPHd6bH88uQmDZW0i216HXCElZguKpbLoecYs8yg3dowlt4f_8fndUVGae8hiZlSaNSrXDdkn3ZR6ieMs3WxJ5e/s400-c/IMG_20190721_065427.jpg';


window.onload = function () {
    // Highlight navigation
    highlightNavigation();

    // check if current url has index.html
    if (document.URL.includes('index.html')) {
        getBlogPostsToDivId(DIV_ID_BLOG_POST);
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

function getBlogPostsToDivId(divId) {
    enableLoader();
    var allPosts = [];
    fetch(BLOG_POSTS_URL, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            Array.from(data.feed.entry).forEach(post => {
                var eachPost = {
                    author: post.author[0].name.$t,
                    title: post.title.$t,
                    summary: post.summary.$t,
                    link: post.link[4].href,
                    published: getReadableDate(post.published.$t),
                    updated: getReadableDate(post.updated.$t),
                    image: post.media$thumbnail?.url.replace('/s72-c/', '/s400-c/')
                }
                if (eachPost.image == undefined) {
                    eachPost.image = DEFAULT_IMAGE_URL;
                }
                allPosts.push(eachPost);
                allPosts.push(eachPost);
            });
            allPosts.forEach(post => {
                var postCard = document.createElement('div');
                postCard.innerHTML = `
                    <div class="post-card">
                        <div class="demo-card-square mdl-card mdl-shadow--2dp">
                            <img
                                src="${post.image}" />
                            <div class="mdl-card__supporting-text">
                                <h5 class="mdl-card__title-text">${post.title}</h5>
                                <p>${post.summary}</p>
                            </div>
                            <div class="mdl-card__actions mdl-card--border">
                                <span class="mdl-button">
                                    ${post.published}
                                </span>
                                <span>
                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="${post.link}">
                                        View post
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById(divId).appendChild(postCard);
            });
            disableLoader();
        });
}