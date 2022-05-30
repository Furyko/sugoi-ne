const baseUrl = 'https://api.jikan.moe/v4/anime/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const animeId = urlParams.get('anime')
    return animeId
}

async function getAnimeInfo(param) {
    if (param) {
        var res = await fetch(baseUrl + await getParam() + param)
    } else {
        var res = await fetch(baseUrl + await getParam() + '/full')
    }
    let jsonResponse = await res.json()
    return await jsonResponse
}

async function setAnimeInfo() {
    const animeInfo = await getAnimeInfo()
    let animeImage = document.getElementById('anime-image')
    animeImage.setAttribute('src', animeInfo.data.images.jpg.image_url)
    let animeTitle = document.getElementById('anime-title')
    animeTitle.innerHTML = animeInfo.data.title
    let rating = document.getElementById('rating')
    rating.innerHTML = animeInfo.data.rating
    let englishTitle = document.getElementById('anime-english-title')
    englishTitle.innerHTML = 'Título en inglés: ' + animeInfo.data.title_english 
    let japaneseTitle = document.getElementById('anime-japanese-title')
    japaneseTitle.innerHTML = 'Título en japonés: ' + animeInfo.data.title_japanese
    let animeDuration = document.getElementById('anime-duration')
    let dateData = animeInfo.data.aired.prop
    let from = dateData.from.day + '-' + dateData.from.month + '-' + dateData.from.year
    let to = dateData.to.day + '-' + dateData.to.month + '-' + dateData.to.year
    animeDuration.innerHTML = 'Duración: ' + from + ' a ' + to
    let animeType = document.getElementById('anime-type')
    animeType.innerHTML = animeInfo.data.type
    let animeStatus = document.getElementById('anime-status')
    if (animeInfo.data.airing) {
        animeStatus.innerHTML = 'En emisión'
        animeStatus.setAttribute('class', 'button bg-green')
    } else {
        animeStatus.innerHTML = 'Finalizado'
        animeStatus.setAttribute('class', 'button bg-red')
    }
    let animeSynopsis = document.getElementById('anime-synopsis')
    animeSynopsis.innerHTML = '<b>Sinopsis: </b>' + animeInfo.data.synopsis
    let animeGenres = document.getElementById('anime-genres')
    for (genre in animeInfo.data.genres) {
        let genreElement = document.createElement('div')
        genreElement.setAttribute('class', 'button bg-cyan')
        genreElement.innerHTML = animeInfo.data.genres[genre].name
        animeGenres.appendChild(genreElement)
    }
    let animeThemes = document.getElementById('anime-themes')
    for (theme in animeInfo.data.themes) {
        let themeElement = document.createElement('div')
        themeElement.setAttribute('class', 'button bg-blue')
        themeElement.innerHTML = animeInfo.data.themes[theme].name
        animeThemes.appendChild(themeElement)
    }
    let animeStudios = document.getElementById('anime-studios')
    for (studio in animeInfo.data.studios) {
        animeStudios.innerHTML = animeStudios.innerHTML + animeInfo.data.studios[studio].name + ', '
    }
    let animeProducers = document.getElementById('anime-producers')
    for (producer in animeInfo.data.producers) {
        animeProducers.innerHTML = animeProducers.innerHTML + animeInfo.data.producers[producer].name + ', '
    }
    let animeLicensors = document.getElementById('anime-licensors')
    for (licensor in animeInfo.data.licensors) {
        animeLicensors.innerHTML = animeLicensors.innerHTML + animeInfo.data.licensors[licensor].name + ', '
    }
    if (animeInfo.data.trailer.embed_url) {
        let iframeContainer = document.getElementById('iframe-container')
        let iframe = document.createElement('iframe')
        iframe.setAttribute('src', animeInfo.data.trailer.embed_url)
        iframeContainer.appendChild(iframe)
    }
    showAnimePictures()
    showAnimeRecommendations()
}

async function showAnimePictures() {
    let animePictures = await getAnimeInfo('/pictures')
    let slidesContainer = document.getElementById('pictures-slides-container')
    await animePictures.data.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-pictures')
        slidesContainer.appendChild(slideItem)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.jpg.image_url)
        slideItem.appendChild(slideImage)
    })
}

async function showAnimeRecommendations() {
    let animeRecommendations = await getAnimeInfo('/recommendations')
    let slidesContainer = document.getElementById('recommendations-slides-container')
    await animeRecommendations.data.map((item) => {
        let slideItem = document.createElement('div')
        slideItem.setAttribute('class', 'slides-recommendations')
        let anchor = document.createElement('a')
        anchor.setAttribute('href', 'anime-info.html?anime=' + item.entry.mal_id)
        anchor.appendChild(slideItem)
        slidesContainer.appendChild(anchor)
        let slideImage = document.createElement('img')
        slideImage.setAttribute('src', item.entry.images.jpg.image_url)
        slideItem.appendChild(slideImage)
        let animeName = document.createElement('span')
        animeName.innerHTML = 'Título: ' + item.entry.title
        let animeInfoContainer = document.createElement('div')
        animeInfoContainer.setAttribute('class', 'slides-info')
        animeInfoContainer.appendChild(animeName)
        slideItem.appendChild(animeInfoContainer)
    })
    let carousselFirstChild = slidesContainer.firstChild
    carousselFirstChild.style.display = 'block'
    showSlides(slideIndex, 'pictures')
    showSlides(slideIndex, 'recommendations')
    cleanLoadingFeedback()
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
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
    }
}

function hideContentWhileLoading() {
    let animeInfoContainer = document.getElementById('anime-info')
    animeInfoContainer.style.display = 'none'
    let picturesCaroussel = document.getElementById('pictures-caroussel-container')
    picturesCaroussel.style.display = 'none'
    let recommendationsCaroussel = document.getElementById('recommendations-caroussel-container')
    recommendationsCaroussel.style.display = 'none'
    displayLoadingFeedback()
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
    let animeInfoContainer = document.getElementById('anime-info')
    animeInfoContainer.style.display = 'flex'
    let picturesCaroussel = document.getElementById('pictures-caroussel-container')
    picturesCaroussel.style.display = 'block'
    let recommendationsCaroussel = document.getElementById('recommendations-caroussel-container')
    recommendationsCaroussel.style.display = 'block'
}

async function startAnimeInfoPage() {
    hideContentWhileLoading()
    setAnimeInfo()
}

setTimeout(function() { startAnimeInfoPage() }, 1);
