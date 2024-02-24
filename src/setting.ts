import browser from 'webextension-polyfill'

import debug from '@utils/debug'
const logger = debug.extend('setting')

async function _listenToInput() {
    const form = document.querySelector('#setting-form') as HTMLFormElement

    if (!form) return
    for (const element of form.querySelectorAll('[name]')) {
        const elem = element as HTMLInputElement
        const data = await browser.storage.sync.get(elem.id)
        if (data[elem.id] !== undefined) {
            elem.value = data[elem.id]
        }
        logger.log('Adding listenser to elem: ', elem.id)
        elem.addEventListener('change', async (evt) => {
            const target = evt?.target as HTMLInputElement
            logger.log('Update storage', elem.id, target.value)
            await browser.storage.sync.set({ [elem.id]: target.value })
        })
    }
}

// Description: setting page
document.addEventListener('DOMContentLoaded', _listenToInput)
