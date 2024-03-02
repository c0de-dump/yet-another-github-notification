import browser from 'webextension-polyfill'

import { GitHubNotification } from '@schema'
import { markThreadAsRead } from '@utils/github'
import debug from '@utils/debug'

const logger = debug.extend('popup')

browser.storage.local.get().then((data) => {
    const div = document.querySelector('#popup-menu') as HTMLDivElement
    if (!div) return
    for (const notification of Object.values(data) as GitHubNotification[]) {
        const elem = document.createElement('div')
        elem.id = `notification-${notification.id}`
        elem.innerHTML = `<p class="item"><b>${notification.repository.name}</b> ${notification.subject.title}</p>`
        elem.onclick = () => {
            logger.log('clicked: ', notification)
            browser.notifications.clear(notification.subject.url)
            browser.tabs.create({ url: notification.repository.html_url })
            browser.storage.local.remove(notification.id)
            markThreadAsRead(notification.id)
            div.removeChild(elem)
        }
        div.appendChild(elem)
    }
})
