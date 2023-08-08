function saveOptions(e) {
    console.log('saveOptions')
    e.preventDefault()
    const form = new FormData(e.target)
    browser.storage.sync.set(Object.fromEntries(form.entries()))
    const node = document.querySelector('#id')
    if (node == null) return
    node.textContent = JSON.stringify(form.entries())
    console.log(form.entries())
}

console.log('loaded setting script')
document.querySelector('form')?.addEventListener('submit', saveOptions)
