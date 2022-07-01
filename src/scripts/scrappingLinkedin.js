import axios from "axios";
import { autoScroll } from "../utils/autoScroll";
import { $, $$ } from "../utils/selectors";
import { waitForElements } from "../utils/waitForElements";
import { selectors } from "./scrapper.config";

const { main } = selectors
async function resolveIsReady() {
    await waitForElements(main.profileImg)
    await autoScroll()
}

function getCookies() {
    const cookies = {}
    document.cookie.split(';').forEach(completeCookie => {
        const [key, value] = completeCookie.split("=")
        cookies[key.trim()] = value.replace(/"/g, '')
    })
    return cookies
}

async function scrap() {
    const contactInfoE = await waitForElements(main.contactInfoA)
    // contactInfoE.click()
    // const contactInfoS = await waitForElements(main.contactInfoS)

    const { JSESSIONID } = getCookies()
    const profileName = document.URL.replace('https://www.linkedin.com/in', '')
    const response = await axios.get(`https://www.linkedin.com/voyager/api/identity/profiles${profileName}profileContactInfo/`,
        {
            headers: {
                'csrf-token': JSESSIONID
            }
        })
    console.log(response.data)

    const arrayExperience = []
    $$(main.generalContainer('experience')).forEach((e) => {
        arrayExperience.push($('span[aria-hidden="true"]', e).textContent)
    })
    console.log(arrayExperience)

    const port = chrome.runtime.connect({ name: 'scrapService' })
    port.postMessage({
        contactInfo: response.data,
        experience: arrayExperience
    })
    
    // chrome.runtime.sendMessage('scrapService', {
    //     contactInfo: response.data,
    //     experience: arrayExperience
    // },
    //     function (response) {
    //         if (!response.success)
    //             console.log('error')

    //     })

}


async function start() {
    await resolveIsReady()
    await scrap()
}


start()