import { GitHubNotification } from '@schema'
import browser from 'webextension-polyfill'

async function _renderNotification(root: HTMLElement, notification: GitHubNotification) {
    const url = notification.subject.url.replace('https://api.github.com/repos/', 'https://github.com/')
    const elem = document.createElement('div')
    elem.innerHTML = `<a href="${url}">${notification.subject.title}</a>`
    elem.onclick = () => {
        browser.notifications.clear(url)
        browser.tabs.create({ url })
        browser.storage.local.remove(notification.id)
        root.removeChild(elem)
    }
    root.appendChild(elem)
}

browser.storage.local.onChanged.addListener(async (changes) => {
    console.log('storage changed: ', changes)
    for (const key in changes) {
        console.log('key: ', key)
    }
})

browser.storage.local.get().then((data) => {
    const div = document.querySelector('#popup-menu') as HTMLDivElement
    if (!div) return
    for (const notification of Object.values(data) as GitHubNotification[]) {
        _renderNotification(div, notification)
    }
})
