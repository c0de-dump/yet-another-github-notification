function saveOptions(e) {
    console.log('saveOptions')
    const form = new FormData(e.target)
    browser.storage.sync.set(Object.fromEntries(form.entries()))
    const node = document.querySelector('#id')
    node.textContent = JSON.stringify(form.entries())
    console.log(form.entries())
    e.preventDefault()
}

function restoreOptions() {
    let storageItem = browser.storage.sync.get('token')
    storageItem.then((res) => {
        document.querySelector('#redirect-url').innerText = res.token
    })
}

console.log(document)
document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
