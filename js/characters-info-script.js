const baseUrl = 'https://api.jikan.moe/v4/characters/'
let slideIndex = 1;

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const mangaId = urlParams.get('characters')
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
    const infoContainer = document.getElementById('character-info')

    const cardImage = document.createElement('div')
    cardImage.setAttribute('class', 'card-image')

    const image = document.createElement('img')
    image.setAttribute('class', 'character-image')
    image.setAttribute('src', data.data.images.jpg.image_url)

    const info = document.createElement('div')
    info.setAttribute('class', 'character-info-container')

    const nameContainer = document.createElement('div')
    nameContainer.setAttribute('class', 'character-name-container')

    const name = document.createElement('span')
    name.setAttribute('class', 'character-name')
    name.innerHTML = data.data.name

    const nameKanji = document.createElement('span')
    nameKanji.innerHTML = 'Kanji: ' + data.data.name_kanji

    const about = document.createElement('div')
    about.setAttribute('class', 'character-about centered')
    about.innerHTML = '<b>Sobre el personaje: </b>' + data.data.about

    cardImage.appendChild(image)
    infoContainer.appendChild(cardImage)
    infoContainer.appendChild(info)
    info.appendChild(nameContainer)
    nameContainer.appendChild(name)
    info.appendChild(nameKanji)
    info.appendChild(about)
}

function showAnimes(data) {
    const recommendationsCarousselContainer = document.getElementById('animes-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Animes en los que aparece'

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
            anchor.setAttribute('href', 'anime-info.html?anime=' + data.data[i].anime.mal_id)
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].anime.images.jpg.image_url)
            let titleContainer = document.createElement('div')
            titleContainer.setAttribute('class', 'slides-info')
            let title = document.createElement('span')
            title.setAttribute('class', 'center')
            title.innerHTML = data.data[i].anime.title
            let role = document.createElement('span')
            role.setAttribute('class', 'center')
            role.innerHTML = '(Rol: ' + data.data[i].role + ')'

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
            titleContainer.appendChild(role)
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
        messageContainer.innerHTML = 'No hay animes disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function showMangas(data) {
    const recommendationsCarousselContainer = document.getElementById('mangas-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Mangas en los que aparece'

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
        cardsContainer.setAttribute('class', 'mangas-cards__container')

        for (i in data.data) {
            let box = document.createElement('li')
            let anchor = document.createElement('a')
            anchor.setAttribute('href', 'manga-info.html?manga=' + data.data[i].manga.mal_id)
            let image = document.createElement('img')
            image.setAttribute('src', data.data[i].manga.images.jpg.image_url)
            let titleContainer = document.createElement('div')
            titleContainer.setAttribute('class', 'slides-info')
            let title = document.createElement('span')
            title.setAttribute('class', 'center')
            title.innerHTML = data.data[i].manga.title
            let role = document.createElement('span')
            role.setAttribute('class', 'center')
            role.innerHTML = '(Rol: ' + data.data[i].role + ')'

            if (i < 5) {
                box.setAttribute('class', 'box-2')
            } else {
                box.setAttribute('class', 'box-2 box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(anchor)
            anchor.appendChild(image)
            anchor.appendChild(titleContainer)
            titleContainer.appendChild(title)
            titleContainer.appendChild(role)
        }

        const prevButton = document.createElement('a')
        prevButton.setAttribute('class', 'prev')
        prevButton.setAttribute('onclick', 'shiftRight("box-2", ".mangas-cards__container")')
        prevButton.innerHTML = '❮'

        const nextButton = document.createElement('a')
        nextButton.setAttribute('class', 'next')
        nextButton.setAttribute('onclick', 'shiftLeft("box-2", ".mangas-cards__container")')
        nextButton.innerHTML = '❯'

        recommendationsCarousselContainer.appendChild(prevButton)
        recommendationsCarousselContainer.appendChild(nextButton)
        cardsWrapper.appendChild(cardsContainer)
    } else {
        const messageContainer = document.createElement('span')
        messageContainer.setAttribute('class', 'center')
        messageContainer.innerHTML = 'No hay mangas disponibles'
        cardsWrapper.appendChild(messageContainer)
    }

    slidesContainer.appendChild(pictures)
    slidesContainer.appendChild(cardsWrapper)
}

function showActors(data) {
    const picturesCarousselContainer = document.getElementById('actors-caroussel-container')
    const carousselTitle = document.createElement('span')
    carousselTitle.innerHTML = 'Actuación de voz'

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
            image.setAttribute('src', data.data[i].person.images.jpg.image_url)
            let nameContainer = document.createElement('div')
            nameContainer.setAttribute('class', 'slides-info')
            let name = document.createElement('span')
            name.setAttribute('class', 'center')
            name.innerHTML = data.data[i].person.name
            let language = document.createElement('span')
            language.setAttribute('class', 'center')
            language.innerHTML = '(' + data.data[i].language + ')'

            if (i < 5) {
                box.setAttribute('class', 'box-pictures')
            } else {
                box.setAttribute('class', 'box-pictures box--hide')
            }

            cardsContainer.appendChild(box)
            box.appendChild(image)
            box.appendChild(nameContainer)
            nameContainer.appendChild(name)
            nameContainer.appendChild(language)
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
    try {
        boxes[4].className = boxClass
    } catch {
        boxes[boxes.length - 1].className = boxClass
    }
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
    showAnimes(await fetchData('/anime'))
    showMangas(await fetchData('/manga'))
    showActors(await fetchData('/voices'))
}

setTimeout(function() { startPage() }, 1);