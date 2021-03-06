import { $ } from './selectors';

export const waitForElements = selector => new Promise((res, rej) => {
    const intervalId = setInterval(() => {
        if ($(selector)) {
            clearInterval(intervalId)
            res($(selector))
        }
    }, 10)
    setTimeout(() => { rej() }, 5500)
})