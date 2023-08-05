import browser from 'webextension-polyfill'

function saveOptions(e: SubmitEvent) {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    browser.storage.sync.set(Object.fromEntries(form.entries()))
}

console.log('loaded setting script')
document.querySelector('form')?.addEventListener('submit', saveOptions)
