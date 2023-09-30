// Description: setting page
document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('#setting-form')

    for (const elem of form?.querySelectorAll('[name]')) {
        data = await browser.storage.sync.get(elem.id)
        elem.value = data[elem.id]
        elem.addEventListener('change', async (evt) => {
            browser.storage.sync.set({ [elem.id]: evt.target.value })
        })
    }
})
