document.querySelector('body > button').addEventListener('click', async () => {
    // busqueda NO harckodeada de linkedin
    const searchLinkedin = document.getElementById('scrapLinkedin').value

    await chrome.tabs.update(
        { url: `https://www.linkedin.com/search/results/people/?keywords=${searchLinkedin}` }
    )

    chrome.runtime.onConnect.addListener(port => {
        if (port.name === 'scrapService') {
            port.onMessage.addListener(message => {
                localStorage.setItem('array', JSON.stringify(message))
            })
        }
    })

})