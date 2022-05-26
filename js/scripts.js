/* ANIME PAGE SECTION (Home page) */
const apiUrlAnime = 'https://api.jikan.moe/v4/anime?sfw=true'
let currentPage
let searchNameParam = ""

async function getAnimeList(param, value) {
    if (param) {
        var res = await fetch(apiUrlAnime + "&" + param + "=" + value + searchNameParam);
    } else {
        if (searchNameParam == "") {
            var res = await fetch(apiUrlAnime);
        } else {
            var res = await fetch(apiUrlAnime + searchNameParam);
        }
    }
    const data = await res.json();
    currentPage = data.pagination.current_page
    return data;
}

async function showAnimeCards(data) {
    const animeListData = await data.data
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
    showAnimeListInfo(await data)
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
    updateGoToPageButtons(data)
}

function displayLoadingFeedback() {
    let loadingAnimationContainer = document.createElement("div")
    loadingAnimationContainer.setAttribute("class", "loading-animation-container")
    let loadingFeedback = document.createElement("div")
    loadingFeedback.setAttribute("class", "loading-animation")
    loadingAnimationContainer.appendChild(loadingFeedback)
    let mainContainer = document.getElementById("main-container")
    mainContainer.appendChild(loadingAnimationContainer)
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
    const data = await getAnimeList("page", nextPage)
    showAnimeCards(await data)
}

async function getPreviousAnimeList() {
    cleanAnimeList()
    let previousPage = currentPage - 1
    const data = await getAnimeList("page", previousPage)
    showAnimeCards(await data)
}

async function goToExactPage() {
    let page = document.getElementById("page-value-input")
    cleanAnimeList()
    const data = await getAnimeList("page", page.value)
    showAnimeCards(await data)
}

function updateGoToPageButtons(data) {
    let nextButton = document.getElementById("next-button")
    let previousBtton = document.getElementById("previous-button")
    if (!data.pagination.has_next_page) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
    if (data.pagination.current_page == 1) {
        previousBtton.disabled = true;
    } else {
        previousBtton.disabled = false;
    }
}

async function searchAnimeByName() {
    let searchValue = document.getElementById("search-bar")
    searchNameParam = "&q=" + searchValue.value
    let data = await getAnimeList()
    cleanAnimeList()
    showAnimeCards(await data)
}

async function startAnimePage() {
    showAnimeCards(await getAnimeList());
}

startAnimePage()