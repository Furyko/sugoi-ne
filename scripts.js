/* ANIME PAGE SECTION (Home page) */
const apiUrlAnime = 'https://api.jikan.moe/v4/anime'
let current_page

async function getAnimeList(page) {
    if (page) {
        var res = await fetch(apiUrlAnime + "?page=" + page);
    } else {
        var res = await fetch(apiUrlAnime);
    }
    const data = await res.json();
    current_page = data.pagination.current_page
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
}

async function getNextAnimeList() {
    let cards = document.getElementById("cards-container")
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild)
    }
    let next_page = current_page + 1
    showAnimeCards(next_page)
}

showAnimeCards();