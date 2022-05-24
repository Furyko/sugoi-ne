/* ANIME PAGE SECTION (Home page) */
const apiUrlAnime = 'https://api.jikan.moe/v4/anime'

async function getAnimeList() {
    const res = await fetch(apiUrlAnime);
    const data = await res.json();
    return data;
}

async function showAnimeCards() {
    const animeList = await getAnimeList()
    const animeListData = await animeList.data
    animeListData.map((item) => {
        console.log(item)
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
        cardImage.setAttribute("height", "250px")
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

showAnimeCards();