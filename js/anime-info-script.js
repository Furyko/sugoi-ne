const baseUrl = 'https://api.jikan.moe/v4/anime/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const mangaId = urlParams.get('anime')
    return mangaId
}

async function fetchData(param) {
    if (param) {
        var res = await fetch(baseUrl + await getParam() + param)
    } else {
        var res = await fetch(baseUrl + await getParam() + '/full')
    }
    let jsonResponse = await res.json()
    return await jsonResponse
}

function showInfo(data) {
    const infoContainer = document.getElementById('anime-info')

    const cardImage = document.createElement('div')
    cardImage.setAttribute('class', 'card-image')

    const image = document.createElement('img')
    image.setAttribute('class', 'anime-image')
    image.setAttribute('src', data.data.images.jpg.image_url)

    const info = document.createElement('div')
    info.setAttribute('class', 'anime-info-container')

    const titleContainer = document.createElement('div')
    titleContainer.setAttribute('class', 'anime-title-and-rating')

    const title = document.createElement('span')
    title.setAttribute('class', 'anime-title')
    title.innerHTML = data.data.title

    const rating = document.createElement('div')
    rating.setAttribute('class', 'button bg-orange rating')
    rating.innerHTML = data.data.rating

    info.appendChild(titleContainer)
    titleContainer.appendChild(title)
    titleContainer.appendChild(rating)

    if (data.data.title_english) {
        const englishTitle = document.createElement('span')
        englishTitle.innerHTML = 'Título en inglés: ' + data.data.title_english
        info.appendChild(englishTitle)
    }

    const japaneseTitle = document.createElement('span')
    japaneseTitle.innerHTML = 'Título en japonés: ' + data.data.title_japanese

    const duration = document.createElement('span')
    const durationInfo = data.data.aired.prop
    const from = durationInfo.from.day + '-' + durationInfo.from.month + '-' + durationInfo.from.year
    const to = durationInfo.to.day + '-' + durationInfo.to.month + '-' + durationInfo.to.year
    duration.innerHTML = 'Duración: ' + from + ' a ' + to

    const stateInfo = document.createElement('div')
    stateInfo.setAttribute('class', 'anime-type-airing display-flex centered')

    const type = document.createElement('div')
    type.setAttribute('class', 'button bg-green')
    type.innerHTML = data.data.type

    const status = document.createElement('div')
    if (data.data.publishing) {
        status.setAttribute('class', 'button bg-green')
        status.innerHTML = 'En publicación'
    } else {
        status.setAttribute('class', 'button bg-red')
        status.innerHTML = 'Finalizado'
    }

    const synopsis = document.createElement('div')
    synopsis.setAttribute('class', 'anime-synopsis centered')
    if (data.data.synopsis) {
        synopsis.innerHTML = '<b>Sinopsis: </b>' + data.data.synopsis
    } else {
        synopsis.innerHTML = '<b>Sinopsis: </b>Desconocida'
    }

    const genreContainer = document.createElement('div')
    genreContainer.setAttribute('class', 'anime-genre display-flex centered')
    for (i in data.data.genres) {
        let genre = document.createElement('div')
        genre.setAttribute('class', 'button bg-cyan')
        genre.innerHTML = data.data.genres[i].name
        genreContainer.appendChild(genre)
    }

    const themesContainer = document.createElement('div')
    themesContainer.setAttribute('class', 'anime-theme display-flex centered')
    for (i in data.data.themes) {
        let theme = document.createElement('div')
        theme.setAttribute('class', 'button bg-blue')
        theme.innerHTML = data.data.themes[i].name
        themesContainer.appendChild(theme)
    }

    const animeStudios = document.createElement('div')
    animeStudios.innerHTML = 'Estudios: '
    if (data.data.studios.length > 0) {
        for (studio in data.data.studios) {
            animeStudios.innerHTML = animeStudios.innerHTML + data.data.studios[studio].name + ', '
        }
    } else {
        animeStudios.innerHTML = animeStudios.innerHTML + 'Desconocidos'
    }

    const animeProducers = document.createElement('div')
    animeProducers.innerHTML = 'Productores: '
    if (data.data.producers.length > 0) {
        for (producer in data.data.producers) {
            animeProducers.innerHTML = animeProducers.innerHTML + data.data.producers[producer].name + ', '
        }
    } else {
        animeProducers.innerHTML = animeProducers.innerHTML + 'Desconocidos'
    }

    const animeLicensors = document.createElement('div')
    animeLicensors.setAttribute('class', 'margin-bottom-1')
    animeLicensors.innerHTML = 'Licenciantes: '
    if (data.data.producers.length > 0) {
        for (licensor in data.data.licensors) {
            animeLicensors.innerHTML = animeLicensors.innerHTML + data.data.licensors[licensor].name + ', '
        }
    } else {
        animeLicensors.innerHTML = animeLicensors.innerHTML + 'Desconocidos'
    }

    info.appendChild(japaneseTitle)
    info.appendChild(duration)
    info.appendChild(stateInfo)
    stateInfo.appendChild(type)
    stateInfo.appendChild(status)
    info.appendChild(synopsis)
    info.appendChild(genreContainer)
    info.appendChild(themesContainer)
    info.appendChild(animeStudios)
    info.appendChild(animeProducers)
    info.appendChild(animeLicensors)
    cardImage.appendChild(image)
    infoContainer.appendChild(cardImage)
    infoContainer.appendChild(info)

    if (data.data.trailer.embed_url) {
        const iframeContainer = document.createElement('div')
        iframeContainer.setAttribute('class', 'iframe-container')
        let iframe = document.createElement('iframe')
        iframe.setAttribute('src', data.data.trailer.embed_url)
        iframeContainer.appendChild(iframe)
        infoContainer.appendChild(iframeContainer)
    }

    if (data.data.theme.openings.length > 0) {
        addMusicList(data.data.theme.openings, 'Openings:', info)
    }
    if (data.data.theme.endings.length > 0) {
        addMusicList(data.data.theme.endings, 'Endings:', info)
    }
}

function addMusicList(list, listTitle, father) {
    let themesContainer = document.createElement('div')
    themesContainer.setAttribute('class', 'margin-bottom-1')
    father.appendChild(themesContainer)
    let theme = document.createElement('div')
    themesContainer.innerHTML = '<b>' + listTitle + '</b>'
    for (opening in list) {
        let element = document.createElement('div')
        element.innerHTML = list[opening]
        theme.appendChild(element)
    }
    themesContainer.appendChild(theme)
}

function showImages(data) {
    const picturesCarousselContainer = document.getElementById('pictures-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Imágenes'

    const hr = document.createElement('hr')

    const slidesContainer = document.createElement('div')
    slidesContainer.setAttribute('class', 'slides-container')

    const pictures = document.createElement('div')
    pictures.setAttribute('class', 'slides-pictures')

    const cardsWrapper = document.createElement('div')
    cardsWrapper.setAttribute('class', 'cards-wrapper')

    if (data.data.length > 0) {
        const cardsContainer = document.createElement('ul')
        cardsContainer.setAttribute('class', 'pictures-cards__container')

        for (i in data.data) {
            let box = document.createElement('li')
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].jpg.image_url)
            if (i < 5) {
                box.setAttribute('class', 'box-pictures')
            } else {
                box.setAttribute('class', 'box-pictures box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(image)
        }

        const prevButton = document.createElement('a')
        prevButton.setAttribute('class', 'prev')
        prevButton.setAttribute('onclick', 'shiftRight("box-pictures", ".pictures-cards__container")')
        prevButton.innerHTML = '❮'

        const nextButton = document.createElement('a')
        nextButton.setAttribute('class', 'next')
        nextButton.setAttribute('onclick', 'shiftLeft("box-pictures", ".pictures-cards__container")')
        nextButton.innerHTML = '❯'

        picturesCarousselContainer.appendChild(prevButton)
        picturesCarousselContainer.appendChild(nextButton)
        cardsWrapper.appendChild(cardsContainer)
    } else {
        const messageContainer = document.createElement('span')
        messageContainer.setAttribute('class', 'center')
        messageContainer.innerHTML = 'No hay imágenes disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    picturesCarousselContainer.appendChild(carousselTitle)
    picturesCarousselContainer.appendChild(hr)
    picturesCarousselContainer.appendChild(slidesContainer)
    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function showRecommendations(data) {
    const recommendationsCarousselContainer = document.getElementById('recommendations-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Animes recomendados'

    const hr = document.createElement('hr')

    const slidesContainer = document.createElement('div')
    slidesContainer.setAttribute('class', 'slides-container')

    const pictures = document.createElement('div')
    pictures.setAttribute('class', 'slides-pictures')

    const cardsWrapper = document.createElement('div')
    cardsWrapper.setAttribute('class', 'cards-wrapper')

    if (data.data.length > 0) {
        const cardsContainer = document.createElement('ul')
        cardsContainer.setAttribute('class', 'recommendations-cards__container')

        for (i in data.data) {
            let box = document.createElement('li')
            let anchor = document.createElement('a')
            anchor.setAttribute('href', 'anime-info.html?anime=' + data.data[i].entry.mal_id)
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].entry.images.jpg.image_url)
            let titleContainer = document.createElement('div')
            titleContainer.setAttribute('class', 'slides-info')
            let title = document.createElement('span')
            title.setAttribute('class', 'center')
            title.innerHTML = data.data[i].entry.title

            if (i < 5) {
                box.setAttribute('class', 'box-recommendations')
            } else {
                box.setAttribute('class', 'box-recommendations box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(anchor)
            anchor.appendChild(image)
            anchor.appendChild(titleContainer)
            titleContainer.appendChild(title)
        }

        const prevButton = document.createElement('a')
        prevButton.setAttribute('class', 'prev')
        prevButton.setAttribute('onclick', 'shiftRight("box-recommendations", ".recommendations-cards__container")')
        prevButton.innerHTML = '❮'

        const nextButton = document.createElement('a')
        nextButton.setAttribute('class', 'next')
        nextButton.setAttribute('onclick', 'shiftLeft("box-recommendations", ".recommendations-cards__container")')
        nextButton.innerHTML = '❯'

        recommendationsCarousselContainer.appendChild(prevButton)
        recommendationsCarousselContainer.appendChild(nextButton)
        cardsWrapper.appendChild(cardsContainer)
    } else {
        const messageContainer = document.createElement('span')
        messageContainer.setAttribute('class', 'center')
        messageContainer.innerHTML = 'No hay recomendaciones disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    recommendationsCarousselContainer.appendChild(carousselTitle)
    recommendationsCarousselContainer.appendChild(hr)
    recommendationsCarousselContainer.appendChild(slidesContainer)
    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function shiftLeft(boxClass, parentCardsContainer) {
    const boxes = document.querySelectorAll("." + boxClass)
    const tmpNode = boxes[0]
    boxes[0].className = boxClass
    setTimeout(function() {
        if (boxes.length > 5) {
            tmpNode.classList.add("box--hide")
            boxes[5].className = boxClass
        }
        document.querySelector(parentCardsContainer).appendChild(tmpNode)
    }, 10)
}

function shiftRight(boxClass, parentCardsContainer) {
    const boxes = document.querySelectorAll("." + boxClass)
    boxes[4].className = boxClass
    setTimeout(function() {
        const noOfCards = boxes.length
        if (noOfCards > 4) {
            boxes[4].className = boxClass + " box--hide"
        }
        const tmpNode = boxes[noOfCards - 1]
        tmpNode.classList.remove("box--hide")
        boxes[noOfCards - 1].remove()
        let parentObj = document.querySelector(parentCardsContainer)
        parentObj.insertBefore(tmpNode, parentObj.firstChild)
    }, 10)
}

async function startPage() {
    const data = await fetchData()
    showInfo(await data)
    showImages(await fetchData('/pictures'))
    showRecommendations(await fetchData('/recommendations'))
}

setTimeout(function() { startPage() }, 1);