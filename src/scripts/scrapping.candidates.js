import { openDB } from "../sw";
import { $, $$ } from "../utils/selectors";

const mainUl = $('main > ul')
let urls = []

// ej del profe

// $$('li .mb1 a', mainUl).forEach(element => {
//     urls.push(element.href.split("?")[0])

//     const port = chrome.runtime.connect({ name: 'scrapElements' })
//     port.postMessage({
//         urls
//     })
// })



$('.reusable-search__entity-result-list > li > div > div > div > .mb1').textContent.forEach(element => {
    urls.push(element.href.split("?")[0])

    // creacion del objeto en la db
    openDB.createrObjectStore('candidates', [urls])

    // también utilizo localstorage (como segunda opcion)
    localStorage.setItem('candidates', JSON.stringify(urls))

    const port = chrome.runtime.connect({ name: 'scrapElements' })
    port.postMessage({
        urls
    })
})


// const infoCandidates = $('.reusable-search__entity-result-list > li > div > div > div > .mb1').textContent // acceso a info de los usuarios desde el resultado de busqueda
// const nameCandidates = $('.reusable-search__entity-result-list > li > div > div > div > .mb1 > div > div > span > span > a').textContent // nombre de los usuarios
// const devCandidates = $('.reusable-search__entity-result-list > li > div > div > div > .mb1 > div > div > .entity-result__primary-subtitle').textContent // fullstack developer
// const cityCandidates = $('.reusable-search__entity-result-list > li > div > div > div > .mb1 > div > div > .entity-result__secondary-subtitle').textContent // ciudad de residencia