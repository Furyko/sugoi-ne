const baseUrl = 'https://api.jikan.moe/v4/manga/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const mangaId = urlParams.get('manga')
    return mangaId
}

async function getMangaInfo(param) {
    if (param) {
        var res = await fetch(baseUrl + await getParam() + param)
    } else {
        var res = await fetch(baseUrl + await getParam())
    }
    let jsonResponse = await res.json()
    return await jsonResponse
}

async function setMangaInfo() {
    const mangaInfo = await getMangaInfo()
    let mangaImage = document.getElementById('manga-image')
    mangaImage.setAttribute('src', mangaInfo.data.images.jpg.image_url)
    let mangaTitle = document.getElementById('manga-title')
    mangaTitle.innerHTML = mangaInfo.data.title
    let englishTitle = document.getElementById('manga-english-title')
    englishTitle.innerHTML = 'Título en inglés: ' + mangaInfo.data.title_english 
    let japaneseTitle = document.getElementById('manga-japanese-title')
    japaneseTitle.innerHTML = 'Título en japonés: ' + mangaInfo.data.title_japanese
    let mangaDuration = document.getElementById('manga-duration')
    let dateData = mangaInfo.data.published.prop
    let from = dateData.from.day + '-' + dateData.from.month + '-' + dateData.from.year
    let to = dateData.to.day + '-' + dateData.to.month + '-' + dateData.to.year
    mangaDuration.innerHTML = 'Duración: ' + from + ' a ' + to
    let mangaType = document.getElementById('manga-type')
    mangaType.innerHTML = mangaInfo.data.type
    let mangaStatus = document.getElementById('manga-status')
    if (mangaInfo.data.publishing) {
        mangaStatus.innerHTML = 'En publicación'
        mangaStatus.setAttribute('class', 'button bg-green')
    } else {
        mangaStatus.innerHTML = 'Finalizado'
        mangaStatus.setAttribute('class', 'button bg-red')
    }
    let mangaSynopsis = document.getElementById('manga-synopsis')
    mangaSynopsis.innerHTML = '<b>Sinopsis: </b>' + mangaInfo.data.synopsis
    let mangaGenres = document.getElementById('manga-genres')
    for (genre in mangaInfo.data.genres) {
        let genreElement = document.createElement('div')
        genreElement.setAttribute('class', 'button bg-cyan')
        genreElement.innerHTML = mangaInfo.data.genres[genre].name
        mangaGenres.appendChild(genreElement)
    }
    let mangaThemes = document.getElementById('manga-themes')
    for (theme in mangaInfo.data.themes) {
        let themeElement = document.createElement('div')
        themeElement.setAttribute('class', 'button bg-blue')
        themeElement.innerHTML = mangaInfo.data.themes[theme].name
        mangaThemes.appendChild(themeElement)
    }
    let mangaStudios = document.getElementById('manga-studios')
    for (magazine in mangaInfo.data.serializations) {
        mangaStudios.innerHTML = mangaStudios.innerHTML + mangaInfo.data.serializations[magazine].name + ', '
    }
    showMangaPictures()
    showMangaRecommendations()
}

async function showMangaPictures() {
    let mangaPictures = await getMangaInfo('/pictures')
    let slidesContainer = document.getElementById('pictures-slides-container')
    await mangaPictures.data.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-pictures')
        slidesContainer.appendChild(slideItem)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.jpg.image_url)
        slideItem.appendChild(slideImage)
    })
}

async function showMangaRecommendations() {
    let mangaRecommendations = await getMangaInfo('/recommendations')
    let slidesContainer = document.getElementById('recommendations-slides-container')
    await mangaRecommendations.data.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-recommendations')
        let anchor = document.createElement('a')
        anchor.setAttribute('href', 'manga-info.html?manga=' + item.entry.mal_id)
        anchor.appendChild(slideItem)
        slidesContainer.appendChild(anchor)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.entry.images.jpg.image_url)
        slideItem.appendChild(slideImage)
    })
    let carousselFirstChild = slidesContainer.firstChild
    carousselFirstChild.style.display = 'block'
    showSlides(slideIndex, 'pictures')
    showSlides(slideIndex, 'recommendations')
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

async function startMangaInfoPage() {
    setMangaInfo()
}

startMangaInfoPage()
