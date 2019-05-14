const apiKey = '9d4f357bf80f41a1be1dedbe65929067';
const defaultSource = 'the-washington-post';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    })
});

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
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
    const res = await fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(createSource).join('\n');
}

function createSource(source){
    return `
        <option value="${source.id}">${source.name}</option>
    `;
}