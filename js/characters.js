/* CHARACTERS PAGE SECTION */
const apiUrlCharacters = 'https://api.jikan.moe/v4/characters?sfw=true'
let currentPage
let searchNameParam = ""

async function getCharactersList(param, value) {
    try {
        if (param) {
            var res = await fetch(apiUrlCharacters + "&" + param + "=" + value + searchNameParam);
        } else {
            if (searchNameParam == "") {
                var res = await fetch(apiUrlCharacters);
            } else {
                var res = await fetch(apiUrlCharacters + searchNameParam);
            }
        }
        const data = await res.json();
        currentPage = data.pagination.current_page
        return data;
    } catch(e) {
        return e
    }
}

async function showCharactersCards(data) {
    try {
        const charactersListData = await data.data
        charactersListData.map((item) => {
            let card = document.createElement("div")
            card.setAttribute("class", "card")
            let cardAnchor = document.createElement("a")
            cardAnchor.setAttribute("href", "characters-info.html?characters=" + item.mal_id)
            card.appendChild(cardAnchor)
            let cardImageContainer = document.createElement("div")
            cardImageContainer.setAttribute("class", "card-image")
            cardAnchor.appendChild(cardImageContainer)
            let cardImage = document.createElement("img")
            cardImage.setAttribute("src",item.images.jpg.image_url)
            cardImage.setAttribute("alt",item.name)
            cardImageContainer.appendChild(cardImage)
            let cardName = document.createElement("div")
            cardName.setAttribute("class", "card-title")
            cardAnchor.appendChild(cardName)
            let characterName = document.createElement("span")
            characterName.innerHTML = item.name
            cardName.appendChild(characterName)
            let cardsContainer = document.getElementById("cards-container")
            cardsContainer.appendChild(card)
        })
        showCharactersListInfo(await data)
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
        reloadButton.setAttribute('class', 'button')
        reloadButton.setAttribute('onclick', 'reloadPage()')
        errorContainer.appendChild(errorTitle)
        errorContainer.appendChild(errorMessage)
        errorContainer.appendChild(errorMessage2)
        errorContainer.appendChild(reloadButton)
        mainContainer.appendChild(errorContainer)
    }
}

async function showCharactersListInfo(data) {
    let charactersListData = data
    let pagesTotal = document.createElement("span")
    pagesTotal.innerHTML = "Total de paginas: " + charactersListData.pagination.last_visible_page
    let currentPage = document.createElement("span")
    currentPage.innerHTML = "Pagina actual: " + charactersListData.pagination.current_page
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

function disableNavigationButtons(trueFalse) {
    const prevListButton = document.getElementById('previous-button')
    prevListButton.disabled = trueFalse
    const nextListButton = document.getElementById('next-button')
    nextListButton.disabled = trueFalse
    const valueInput = document.getElementById('page-value-input')
    valueInput.disabled = trueFalse
    const goToButton = document.getElementById('goto-page-input')
    goToButton.disabled = trueFalse
}

function cleanCharactersList() {
    let cards = document.getElementById("cards-container")
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild)
    }
    let infoContainer = document.getElementById("list-info-container")
    while (infoContainer.firstChild) {
        infoContainer.removeChild(infoContainer.firstChild)
    }
}

async function getNextCharactersList() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanCharactersList()
    let nextPage = currentPage + 1
    const data = await getCharactersList("page", nextPage)
    showCharactersCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
}

async function getPreviousCharactersList() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanCharactersList()
    let previousPage = currentPage - 1
    const data = await getCharactersList("page", previousPage)
    showCharactersCards(await data)
    cleanLoadingFeedback()
    disableNavigationButtons(false)
}

async function goToExactPage() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    let page = document.getElementById("page-value-input")
    cleanCharactersList()
    const data = await getCharactersList("page", page.value)
    showCharactersCards(await data)
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

async function searchCharacterByName() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    cleanCharactersList()
    let searchValue = document.getElementById("search-bar")
    searchNameParam = "&q=" + searchValue.value
    let data = await getCharactersList()
    showCharactersCards(await data)
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

async function startCharactersPage() {
    displayLoadingFeedback()
    disableNavigationButtons(true)
    showCharactersCards(await getCharactersList());
    cleanLoadingFeedback()
    disableNavigationButtons(false)
    listenGoToForm()
    listenToSearchForm()
}

setTimeout(function() { startCharactersPage() }, 1);