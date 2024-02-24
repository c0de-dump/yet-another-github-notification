import { GitHubNotification } from '@schema'
import browser from 'webextension-polyfill'
import { markThreadAsRead } from './github'
import debug from './debug'
const logger = debug.extend('popup')

const _typeMaps: Record<string, string> = {
    issue: '🧐',
    pull_request: '🤓',
    release: '📦',
    commit: '📝',
    discussion: '💬',
    security_advisory: '🔐',
    repository_vulnerability_alert: '🔐',
    check_run: '✅',
    check_suite: '🚀',
    sponsorship: '💖',
    mention: '👋',
    unknown: '🤔',
}

function _renderNotificationHTML(notification: GitHubNotification) {
    const url = notification.subject.url.replace('https://api.github.com/repos/', 'https://github.com/')
    const type = notification.subject.type.toLowerCase()
    let icon = _typeMaps[type]
    if (!icon) {
        logger.log('unknown type: ', type)
        icon = _typeMaps['unknown']
    }

    return `${icon} <a href="${url}">${notification.subject.title}</a>`
}

browser.storage.local.onChanged.addListener(async (changes) => {
    logger.log('storage changed: ', changes)
    for (const key in changes) {
        logger.log('key: ', key)
    }
})

browser.storage.local.get().then((data) => {
    const div = document.querySelector('#popup-menu') as HTMLDivElement
    if (!div) return
    for (const notification of Object.values(data) as GitHubNotification[]) {
        const elem = document.createElement('div')
        elem.innerHTML = _renderNotificationHTML(notification)
        elem.onclick = () => {
            browser.notifications.clear(notification.subject.url)
            browser.tabs.create({ url: notification.repository.html_url })
            browser.storage.local.remove(notification.id)
            markThreadAsRead(notification.id)
            div.removeChild(elem)
        }
        div.appendChild(elem)
    }
})
