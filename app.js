const apiKey = '9d4f357bf80f41a1be1dedbe65929067';
const main = document.querySelector('main');

window.addEventListener('load', e => {
    updateNews();
});

async function updateNews() {
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}