const baseUrl = 'https://api.jikan.moe/v4/anime/'

async function getParam() {
    const values = window.location.search
    const urlParams = new URLSearchParams(values)
    const animeId = urlParams.get('anime')
    return animeId
}

async function getAnimeInfo() {
    let res = await fetch(baseUrl + await getParam())
    let jsonResponse = await res.json()
    return await jsonResponse
}

async function startAnimeInfoPage() {
    console.log(await getAnimeInfo())
}

startAnimeInfoPage()
