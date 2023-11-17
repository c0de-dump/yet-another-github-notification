import browser from 'webextension-polyfill'

alert('background script loaded')
browser.storage.sync.onChanged.addListener((changes: any) => {
    alert(`storage changed:  ${JSON.stringify(changes)}`)
})
