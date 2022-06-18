const baseUrl = 'https://api.jikan.moe/v4/manga/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const mangaId = urlParams.get('manga')
    return mangaId
}

async function fetchData(param) {
    if (param) {
        var res = await fetch(baseUrl + await getParam() + param)
    } else {
        var res = await fetch(baseUrl + await getParam())
    }
    let jsonResponse = await res.json()
    return await jsonResponse
}

function showInfo(data) {
    const infoContainer = document.getElementById('manga-info')

    const cardImage = document.createElement('div')
    cardImage.setAttribute('class', 'card-image')

    const image = document.createElement('img')
    image.setAttribute('class', 'manga-image')
    image.setAttribute('src', data.data.images.jpg.image_url)

    const info = document.createElement('div')
    info.setAttribute('class', 'manga-info-container')

    const titleContainer = document.createElement('div')
    titleContainer.setAttribute('class', 'manga-title-and-rating')

    const title = document.createElement('span')
    title.setAttribute('class', 'manga-title')
    title.innerHTML = data.data.title

    info.appendChild(titleContainer)
    titleContainer.appendChild(title)

    if (data.data.title_english) {
        const englishTitle = document.createElement('span')
        englishTitle.innerHTML = 'Título en inglés: ' + data.data.title_english
        info.appendChild(englishTitle)
    }

    const japaneseTitle = document.createElement('span')
    japaneseTitle.innerHTML = 'Título en japonés: ' + data.data.title_japanese

    const duration = document.createElement('span')
    const durationInfo = data.data.published.prop
    const from = durationInfo.from.day + '-' + durationInfo.from.month + '-' + durationInfo.from.year
    const to = durationInfo.to.day + '-' + durationInfo.to.month + '-' + durationInfo.to.year
    duration.innerHTML = 'Duración: ' + from + ' a ' + to

    const stateInfo = document.createElement('div')
    stateInfo.setAttribute('class', 'manga-type-airing display-flex centered')

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
    synopsis.setAttribute('class', 'manga-synopsis centered')
    if (data.data.synopsis) {
        synopsis.innerHTML = '<b>Sinopsis: </b>' + data.data.synopsis
    } else {
        synopsis.innerHTML = '<b>Sinopsis: </b>Desconocida'
    }

    const genreContainer = document.createElement('div')
    genreContainer.setAttribute('class', 'manga-genre display-flex centered')
    for (i in data.data.genres) {
        let genre = document.createElement('div')
        genre.setAttribute('class', 'button bg-cyan')
        genre.innerHTML = data.data.genres[i].name
        genreContainer.appendChild(genre)
    }

    const themesContainer = document.createElement('div')
    themesContainer.setAttribute('class', 'manga-theme display-flex centered')
    for (i in data.data.themes) {
        let theme = document.createElement('div')
        theme.setAttribute('class', 'button bg-blue')
        theme.innerHTML = data.data.themes[i].name
        themesContainer.appendChild(theme)
    }

    const serializations = document.createElement('div')
    serializations.setAttribute('class', 'manga-theme display-flex centered')
    serializations.innerHTML = 'Serializaciónes: '
    if (data.data.serializations.length > 0) {
        for (i in data.data.serializations) {
            serializations.innerHTML = serializations.innerHTML + data.data.serializations[i].name + ', '
        }
    } else {
        serializations.innerHTML = serializations.innerHTML + 'Desconocidas'
    }

    info.appendChild(japaneseTitle)
    info.appendChild(duration)
    info.appendChild(stateInfo)
    stateInfo.appendChild(type)
    stateInfo.appendChild(status)
    info.appendChild(synopsis)
    info.appendChild(genreContainer)
    info.appendChild(themesContainer)
    info.appendChild(serializations)
    cardImage.appendChild(image)
    infoContainer.appendChild(cardImage)
    infoContainer.appendChild(info)
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

    picturesCarousselContainer.appendChild(carousselTitle)
    picturesCarousselContainer.appendChild(hr)
    picturesCarousselContainer.appendChild(slidesContainer)

    if (data.data.length > 0) {
        const cardsContainer = document.createElement('ul')
        cardsContainer.setAttribute('class', 'pictures-cards__container')

        for (i in data.data) {
            let box = document.createElement('li')
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].jpg.image_url)
            if (i < 5) {
                box.setAttribute('class', 'box-1')
                if (data.data.length <= 1) {
                    box.setAttribute('class', 'box-1-1-element')
                } else if (data.data.length <= 2) {
                    box.setAttribute('class', 'box-1-2-elements')
                } else {
                    box.setAttribute('class', 'box-1')
                }
            } else {
                box.setAttribute('class', 'box-1 box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(image)
        }
        setNextAndPrevButtons(picturesCarousselContainer, data, 'box-1', '.pictures-cards__container')
        cardsWrapper.appendChild(cardsContainer)
    } else {
        const messageContainer = document.createElement('span')
        messageContainer.setAttribute('class', 'center')
        messageContainer.innerHTML = 'No hay imágenes disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function showRecommendations(data) {
    const recommendationsCarousselContainer = document.getElementById('recommendations-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Mangas recomendados'

    const hr = document.createElement('hr')

    const slidesContainer = document.createElement('div')
    slidesContainer.setAttribute('class', 'slides-container')

    const pictures = document.createElement('div')
    pictures.setAttribute('class', 'slides-pictures')

    const cardsWrapper = document.createElement('div')
    cardsWrapper.setAttribute('class', 'cards-wrapper')

    recommendationsCarousselContainer.appendChild(carousselTitle)
    recommendationsCarousselContainer.appendChild(hr)
    recommendationsCarousselContainer.appendChild(slidesContainer)

    if (data.data.length > 0) {
        const cardsContainer = document.createElement('ul')
        cardsContainer.setAttribute('class', 'recommendations-cards__container')

        for (i in data.data) {
            let box = document.createElement('li')
            let anchor = document.createElement('a')
            anchor.setAttribute('href', 'manga-info.html?manga=' + data.data[i].entry.mal_id)
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].entry.images.jpg.image_url)
            let titleContainer = document.createElement('div')
            titleContainer.setAttribute('class', 'slides-info')
            let title = document.createElement('span')
            title.setAttribute('class', 'center')
            title.innerHTML = data.data[i].entry.title

            if (i < 5) {
                if (data.data.length <= 1) {
                    box.setAttribute('class', 'box-2-1-element')
                } else if (data.data.length <= 2) {
                    box.setAttribute('class', 'box-2-2-elements')
                } else {
                    box.setAttribute('class', 'box-2')
                }
            } else {
                box.setAttribute('class', 'box-2 box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(anchor)
            anchor.appendChild(image)
            anchor.appendChild(titleContainer)
            titleContainer.appendChild(title)
        }
        setNextAndPrevButtons(recommendationsCarousselContainer, data, 'box-2', '.recommendations-cards__container')
        cardsWrapper.appendChild(cardsContainer)
    } else {
        const messageContainer = document.createElement('span')
        messageContainer.setAttribute('class', 'center')
        messageContainer.innerHTML = 'No hay recomendaciones disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function setNextAndPrevButtons(parent, data, className, container) {
    const prevButton = document.createElement('a')
        prevButton.setAttribute('class', 'prev')
        if (data.data.length <= 2) {
            prevButton.setAttribute('onclick', `shiftRight("${className}-2-elements", "${container}")`)
        } else {
            prevButton.setAttribute('onclick', `shiftRight("${className}", "${container}")`)
        }
        prevButton.innerHTML = '❮'

        const nextButton = document.createElement('a')
        nextButton.setAttribute('class', 'next')
        if (data.data.length <= 2) {
            nextButton.setAttribute('onclick', `shiftLeft("${className}-2-elements", "${container}")`)
        } else {
            nextButton.setAttribute('onclick', `shiftLeft("${className}", "${container}")`)
        }
        nextButton.innerHTML = '❯'

        parent.appendChild(prevButton)
        parent.appendChild(nextButton)
}

function shiftLeft(boxClass, parentCardsContainer) {
    const boxes = document.querySelectorAll(parentCardsContainer + " ." + boxClass);
    const tmpNode = boxes[0];
    boxes[0].className = boxClass;
    setTimeout(function() {
        if (boxes.length > 5) {
            tmpNode.classList.add("box--hide");
            boxes[5].className = boxClass;
        }
        document.querySelector(parentCardsContainer).appendChild(tmpNode);
    }, 10);
}

function shiftRight(boxClass, parentCardsContainer) {
    const boxes = document.querySelectorAll(parentCardsContainer + " ." + boxClass);
    try {
        boxes[4].className = boxClass
    } catch {
        boxes[boxes.length - 1].className = boxClass
    }
    setTimeout(function() {
        const noOfCards = boxes.length;
        if (noOfCards > 4) {
            boxes[4].className = boxClass + " box--hide";
        }
        const tmpNode = boxes[noOfCards - 1];
        tmpNode.classList.remove("box--hide");
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(parentCardsContainer);
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
    }, 10);
}

async function startPage() {
    const data = await fetchData()
    showInfo(await data)
    showImages(await fetchData('/pictures'))
    showRecommendations(await fetchData('/recommendations'))
}

setTimeout(function() { startPage() }, 1);