import browser from 'webextension-polyfill'

async function Poll() {
    console.log('Polling...')
    const token = await browser.storage.sync.get('token')
    console.log('token:', token)
}

browser.runtime.onInstalled.addListener(Poll)
