/* ANIME PAGE SECTION (Home page) */
const apiUrlAnime = 'https://api.jikan.moe/v4/anime'
let currentPage

async function getAnimeList(page) {
    if (page) {
        var res = await fetch(apiUrlAnime + "?page=" + page);
    } else {
        var res = await fetch(apiUrlAnime);
    }
    const data = await res.json();
    currentPage = data.pagination.current_page
    return data;
}

async function showAnimeCards(page) {
    if (page) {
        var animeList = await getAnimeList(page)
    } else {
        var animeList = await getAnimeList()
    }
    const animeListData = await animeList.data
    animeListData.map((item) => {
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        let cardAnchor = document.createElement("a")
        cardAnchor.setAttribute("href", "#")
        card.appendChild(cardAnchor)
        let cardImageContainer = document.createElement("div")
        cardImageContainer.setAttribute("class", "card-image")
        cardAnchor.appendChild(cardImageContainer)
        let cardImage = document.createElement("img")
        cardImage.setAttribute("src",item.images.jpg.image_url)
        cardImageContainer.appendChild(cardImage)
        let cardTitle = document.createElement("div")
        cardTitle.setAttribute("class", "card-title")
        cardAnchor.appendChild(cardTitle)
        let animeTitle = document.createElement("span")
        animeTitle.innerHTML = item.title
        cardTitle.appendChild(animeTitle)
        let cardsContainer = document.getElementById("cards-container")
        cardsContainer.appendChild(card)
    })
    showAnimeListInfo(await animeList)
}

async function showAnimeListInfo(data) {
    let animeListData = data
    let pagesTotal = document.createElement("span")
    pagesTotal.innerHTML = "Total de paginas: " + animeListData.pagination.last_visible_page
    let currentPage = document.createElement("span")
    currentPage.innerHTML = "Pagina actual: " + animeListData.pagination.current_page
    let infoContainer = document.getElementById("list-info-container")
    infoContainer.appendChild(pagesTotal)
    infoContainer.appendChild(currentPage)
}

function cleanAnimeList() {
    let cards = document.getElementById("cards-container")
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild)
    }
    let infoContainer = document.getElementById("list-info-container")
    while (infoContainer.firstChild) {
        infoContainer.removeChild(infoContainer.firstChild)
    }
}

async function getNextAnimeList() {
    cleanAnimeList()
    let nextPage = currentPage + 1
    showAnimeCards(nextPage)
}

async function getPreviousAnimeList() {
    cleanAnimeList()
    let previousPage = currentPage - 1
    showAnimeCards(previousPage)
}

async function goToExactPage() {
    let page = document.getElementById("page-value-input")
    console.log("Going to page", page.value)
    cleanAnimeList()
    showAnimeCards(page.value)
}

showAnimeCards();