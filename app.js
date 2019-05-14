const apiKey = '9d4f357bf80f41a1be1dedbe65929067';
const main = document.querySelector('main');
const selector = document.querySelector('#sourceSelector');

window.addEventListener('load', e => {
    updateNews();
    updateSources();
});

async function updateNews() {
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}" target="_blank">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}

async function updateSources(){
    const res = await fetch('https://newsapi.org/v2/sources?language=en&apiKey=' + apiKey);
    const json = await res.json();

    selector.innerHTML = json.sources.map(createSource).join('\n');
}

function createSource(source){
    return `
        <option value="${source.id}">${source.name}</option>
    `;
}