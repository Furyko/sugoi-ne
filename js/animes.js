/* ANIME PAGE SECTION */
const apiUrlAnime = 'https://api.jikan.moe/v4/anime?sfw=true&genres_exclude=9,12,14,26,28,49,58,65,81'
let currentPage
let searchNameParam = ""

async function getAnimeList(param, value) {
    try {
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
    } catch(e) {
        return e
    }
}

async function showAnimeCards(data) {
    try {
        const animeListData = await data.data
        animeListData.map((item) => {
            let card = document.createElement("div")
            card.setAttribute("class", "card")
            let cardAnchor = document.createElement("a")
            cardAnchor.setAttribute("href", "anime-info.html?anime=" + item.mal_id)
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
    } catch(e) {
        let mainContainer = document.getElementById('main-container')
        let errorContainer = document.createElement('div')
        let errorTitle = document.createElement('span')
        let errorMessage = document.createElement('span')
        let errorMessage2 = document.createElement('span')
        let reloadButton = document.createElement('button')
        errorTitle.innerHTML = "Uh Oh"
        reloadButton.innerHTML = "Recargar"
        errorMessage.innerHTML = data.message
        errorMessage2.innerHTML = "Revisa tu conexión a internet y prueba otra vez, por favor."
        errorContainer.setAttribute('class', 'center flex-column')
        errorTitle.setAttribute('class', 'bold-text font-subtitle')
        reloadButton.setAttribute('class', 'btn-primary')
        reloadButton.setAttribute('onclick', 'reloadPage()')
        errorContainer.appendChild(errorTitle)
        errorContainer.appendChild(errorMessage)
        errorContainer.appendChild(errorMessage2)
        errorContainer.appendChild(reloadButton)
        mainContainer.appendChild(errorContainer)
        disableNavigationButtons(true)
    }
}

async function showAnimeListInfo(data) {
    let animeListData = data
    let valueInput = document.getElementById('page-value-input')
    valueInput.value = animeListData.pagination.current_page
    let pagesTotal = document.createElement("span")
    pagesTotal.innerHTML = "Total de paginas: " + animeListData.pagination.last_visible_page
    let infoContainer = document.getElementById("list-info-container")
    infoContainer.appendChild(pagesTotal)
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

function disableNavigationButtons(trueFalse) {
    const prevListButton = document.getElementById('previous-button')
    prevListButton.disabled = trueFalse
    const nextListButton = document.getElementById('next-button')
    nextListButton.disabled = trueFalse
    const valueInput = document.getElementById('page-value-input')
    valueInput.disabled = trueFalse
    const goToButton = document.getElementById('goto-page-input')
    goToButton.disabled = trueFalse
    const searchBar = document.getElementById('search-bar')
    searchBar.disabled = trueFalse
    const searchButton = document.getElementById('search-button')
    searchButton.disabled = trueFalse
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
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanAnimeList()
    let nextPage = currentPage + 1
    const data = await getAnimeList("page", nextPage)
    showAnimeCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
}

async function getPreviousAnimeList() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanAnimeList()
    let previousPage = currentPage - 1
    const data = await getAnimeList("page", previousPage)
    showAnimeCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
}

async function goToExactPage() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    let page = document.getElementById("page-value-input")
    cleanAnimeList()
    const data = await getAnimeList("page", page.value)
    showAnimeCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
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
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanAnimeList()
    let searchValue = document.getElementById("search-bar")
    searchNameParam = "&q=" + searchValue.value
    let data = await getAnimeList()
    showAnimeCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
}

function reloadPage() {
    location.reload()
}

function listenGoToForm() {
    const form = document.getElementById('goto-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        goToExactPage()
    })
}

function listenToSearchForm() {
    const form = document.getElementById('search-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}

async function startAnimePage() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    showAnimeCards(await getAnimeList());
    cleanLoadingFeedback()
    disableNavigationButtons(false)
    listenGoToForm()
    listenToSearchForm()
}

setTimeout(function() { startAnimePage() }, 1);
