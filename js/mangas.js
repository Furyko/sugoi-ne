/* MANGA PAGE SECTION */
const apiUrlManga = 'https://api.jikan.moe/v4/manga?sfw=true'
let currentPage
let searchNameParam = ""

async function getMangaList(param, value) {
    if (param) {
        var res = await fetch(apiUrlManga + "&" + param + "=" + value + searchNameParam);
    } else {
        if (searchNameParam == "") {
            var res = await fetch(apiUrlManga);
        } else {
            var res = await fetch(apiUrlManga + searchNameParam);
        }
    }
    const data = await res.json();
    currentPage = data.pagination.current_page
    return data;
}

async function showMangaCards(data) {
    const mangaListData = await data.data
    mangaListData.map((item) => {
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        let cardAnchor = document.createElement("a")
        cardAnchor.setAttribute("href", "manga-info.html?manga=" + item.mal_id)
        card.appendChild(cardAnchor)
        let cardImageContainer = document.createElement("div")
        cardImageContainer.setAttribute("class", "card-image")
        cardAnchor.appendChild(cardImageContainer)
        let cardImage = document.createElement("img")
        cardImage.setAttribute("src",item.images.jpg.image_url)
        cardImage.setAttribute("alt",item.title)
        cardImageContainer.appendChild(cardImage)
        let cardTitle = document.createElement("div")
        cardTitle.setAttribute("class", "card-title")
        cardAnchor.appendChild(cardTitle)
        let mangaTitle = document.createElement("span")
        mangaTitle.innerHTML = item.title
        cardTitle.appendChild(mangaTitle)
        let cardsContainer = document.getElementById("cards-container")
        cardsContainer.appendChild(card)
    })
    showMangaListInfo(await data)
}

async function showMangaListInfo(data) {
    let mangaListData = data
    let pagesTotal = document.createElement("span")
    pagesTotal.innerHTML = "Total de paginas: " + mangaListData.pagination.last_visible_page
    let currentPage = document.createElement("span")
    currentPage.innerHTML = "Pagina actual: " + mangaListData.pagination.current_page
    let infoContainer = document.getElementById("list-info-container")
    infoContainer.appendChild(pagesTotal)
    infoContainer.appendChild(currentPage)
    updateGoToPageButtons(data)
}

function displayLoadingFeedback() {
    let loadingAnimationContainer = document.createElement("div")
    loadingAnimationContainer.setAttribute("class", "loading-animation-container")
    loadingAnimationContainer.setAttribute("id", "loading-animation-container")
    let loadingFeedback = document.createElement("div")
    loadingFeedback.setAttribute("class", "loading-animation")
    loadingAnimationContainer.appendChild(loadingFeedback)
    let mainContainer = document.getElementById("main-container")
    mainContainer.appendChild(loadingAnimationContainer)
}

function cleanLoadingFeedback() {
    let loadingAnimationContainer = document.getElementById("loading-animation-container")
    loadingAnimationContainer.remove()
}

function cleanMangaList() {
    let cards = document.getElementById("cards-container")
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild)
    }
    let infoContainer = document.getElementById("list-info-container")
    while (infoContainer.firstChild) {
        infoContainer.removeChild(infoContainer.firstChild)
    }
}

async function getNextMangaList() {
    displayLoadingFeedback()
    cleanMangaList()
    let nextPage = currentPage + 1
    const data = await getMangaList("page", nextPage)
    showMangaCards(await data)
    cleanLoadingFeedback()
}

async function getPreviousMangaList() {
    displayLoadingFeedback()
    cleanMangaList()
    let previousPage = currentPage - 1
    const data = await getMangaList("page", previousPage)
    showMangaCards(await data)
    cleanLoadingFeedback()
}

async function goToExactPage() {
    displayLoadingFeedback()
    let page = document.getElementById("page-value-input")
    cleanMangaList()
    const data = await getMangaList("page", page.value)
    showMangaCards(await data)
    cleanLoadingFeedback()
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

async function searchMangaByName() {
    displayLoadingFeedback()
    cleanMangaList()
    let searchValue = document.getElementById("search-bar")
    searchNameParam = "&q=" + searchValue.value
    let data = await getMangaList()
    showMangaCards(await data)
    cleanLoadingFeedback()
}

async function startMangaPage() {
    displayLoadingFeedback()
    showMangaCards(await getMangaList());
    cleanLoadingFeedback()
}

setTimeout(function() { startMangaPage() }, 1);