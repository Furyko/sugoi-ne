const baseUrl = 'https://api.jikan.moe/v4/characters/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const characterId = urlParams.get('characters')
    return characterId
}

async function getCharacterInfo(param) {
    if (param) {
        var res = await fetch(baseUrl + await getParam() + param)
    } else {
        var res = await fetch(baseUrl + await getParam() + '/full')
    }
    let jsonResponse = await res.json()
    return await jsonResponse
}

async function setCharacterInfo() {
    const characterInfo = await getCharacterInfo()
    let characterImage = document.getElementById('character-image')
    characterImage.setAttribute('src', characterInfo.data.images.jpg.image_url)
    let characterName = document.getElementById('character-name')
    characterName.innerHTML = characterInfo.data.name
    let japaneseName = document.getElementById('character-japanese-name')
    japaneseName.innerHTML = 'Kanji: ' + characterInfo.data.name_kanji
    let nicknamesList = document.getElementById('character-nickname-list')
    if (characterInfo.data.nicknames.length != 0) {
        for (nickname in characterInfo.data.nicknames) {
            let nicknameItem = document.createElement('li')
            nicknameItem.innerHTML = characterInfo.data.nicknames[nickname]
            nicknamesList.querySelector('ul').appendChild(nicknameItem)
        }
    } else {
        nicknamesList.remove()
    }
    let characterAbout = document.getElementById('character-about')
    characterAbout.innerHTML = '<b>Acerca de: </b>' + characterInfo.data.about
    let characterGenres = document.getElementById('character-genres')
    for (genre in characterInfo.data.genres) {
        let genreElement = document.createElement('div')
        genreElement.setAttribute('class', 'button bg-cyan')
        genreElement.innerHTML = characterInfo.data.genres[genre].name
        characterGenres.appendChild(genreElement)
    }
    showCharacterAnimes(await characterInfo)
    showCharacterMangas(await characterInfo)
    showCharacterActors(await characterInfo)
    showSlides(slideIndex, 'animes')
    showSlides(slideIndex, 'mangas')
    showSlides(slideIndex, 'actors')
}

async function showCharacterAnimes(data) {
    let animeList = data.data.anime
    let slidesContainer = document.getElementById('animes-slides-container')
    await animeList.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-animes')
        let anchor = document.createElement('a')
        anchor.setAttribute('href', 'anime-info.html?anime=' + item.anime.mal_id)
        anchor.appendChild(slideItem)
        slidesContainer.appendChild(anchor)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.anime.images.jpg.image_url)
        slideItem.appendChild(slideImage)
        let animeName = document.createElement('span')
        animeName.innerHTML = 'Título: ' + item.anime.title
        let characterRole = document.createElement('span')
        characterRole.innerHTML = 'Rol: ' + item.role
        let animeInfoContainer = document.createElement('div')
        animeInfoContainer.setAttribute('class', 'slides-info')
        animeInfoContainer.appendChild(animeName)
        animeInfoContainer.appendChild(characterRole)
        slideItem.appendChild(animeInfoContainer)
    })
    let carousselFirstChild = slidesContainer.firstChild
    carousselFirstChild.style.display = 'block'
}

async function showCharacterMangas(data) {
    let characterRecommendations = data.data.manga
    let slidesContainer = document.getElementById('mangas-slides-container')
    await characterRecommendations.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-mangas')
        let anchor = document.createElement('a')
        anchor.setAttribute('href', 'manga-info.html?manga=' + item.manga.mal_id)
        anchor.appendChild(slideItem)
        slidesContainer.appendChild(anchor)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.manga.images.jpg.image_url)
        slideItem.appendChild(slideImage)
        let mangaName = document.createElement('span')
        mangaName.innerHTML = 'Título: ' + item.manga.title
        let characterRole = document.createElement('span')
        characterRole.innerHTML = 'Rol: ' + item.role
        let mangaInfoContainer = document.createElement('div')
        mangaInfoContainer.setAttribute('class', 'slides-info')
        mangaInfoContainer.appendChild(mangaName)
        mangaInfoContainer.appendChild(characterRole)
        slideItem.appendChild(mangaInfoContainer)
    })
    let carousselFirstChild = slidesContainer.firstChild
    carousselFirstChild.style.display = 'block'
}

async function showCharacterActors(data) {
    let actorsList = data.data.voices
    let slidesContainer = document.getElementById('actors-slides-container')
    await actorsList.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-actors')
        slidesContainer.appendChild(slideItem)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.person.images.jpg.image_url)
        slideItem.appendChild(slideImage)
        let actorName = document.createElement('span')
        actorName.innerHTML = 'Nombre: ' +item.person.name
        let actorLanguage = document.createElement('span')
        actorLanguage.innerHTML = 'Lenguaje: ' +item.language
        let actorInfoContainer = document.createElement('div')
        actorInfoContainer.setAttribute('class', 'slides-info')
        actorInfoContainer.appendChild(actorName)
        actorInfoContainer.appendChild(actorLanguage)
        slideItem.appendChild(actorInfoContainer)
    })
    let carousselFirstChild = slidesContainer.firstChild
    carousselFirstChild.style.display = 'block'
}

function changeSlide(n, slide) {
    showSlides(slideIndex += n, slide);
}

async function showSlides(n, slide) {
    let slides = await document.getElementsByClassName('slides-' + slide)
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

async function startCharacterInfoPage() {
    setCharacterInfo()
}

startCharacterInfoPage()
