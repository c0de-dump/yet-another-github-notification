import browser from 'webextension-polyfill'

console.log('background script loaded')
browser.storage.sync.onChanged.addListener((changes: any) => {
    console.log('storage changed', changes)
})

browser.runtime.onStartup.addListener(() => {
    console.log('runtime started')
})
browser.runtime.onInstalled.addListener(() => {
    console.log('runtime installed')
    browser.tabs.create({ url: 'http://google.com' })
})

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log({ sender, sendResponse, message })
})
