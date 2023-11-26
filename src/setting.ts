import browser from 'webextension-polyfill'

// Description: setting page
document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('#setting-form')

    if (!form) return

    for (const element of form.querySelectorAll('[name]')) {
        const elem = element as HTMLInputElement
        const data = await browser.storage.sync.get(elem.id)
        if (data[elem.id] !== undefined) {
            elem.value = data[elem.id]
        }
        console.log('Adding listenser to elem: ', elem.id)
        elem.addEventListener('change', async (evt) => {
            const target = evt?.target as HTMLInputElement
            console.log('Update storage', elem.id, target.value)
            await browser.storage.sync.set({ [elem.id]: target.value })
        })
    }
})
