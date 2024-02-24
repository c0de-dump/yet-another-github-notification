import browser from 'webextension-polyfill'
import type { GitHubNotification } from '@schema'
import { listNotifications } from './github'
import debug from './debug'
const logger = debug.extend('background')

const second = 1000
const _interval = 10 * second

async function _createNotification(notification: GitHubNotification) {
    logger.log('create notification: ', notification)
    const url = notification.subject.url.replace('https://api.github.com/repos/', 'https://github.com/')
    await browser.notifications.create(url, {
        type: 'basic',
        title: notification.subject.title,
        message: notification.repository.full_name,
        iconUrl: notification.repository.owner.avatar_url as string,
    })
}

async function _storeNotification(notification: GitHubNotification) {
    await browser.storage.local.set({ [notification.id]: notification })
}

async function _newNotification(notification: GitHubNotification): Promise<boolean> {
    const notifs = await browser.storage.local.get(notification.id)
    const notif = notifs[notification.id]
    return notif === undefined || notif.updated_at !== notification.updated_at
}

async function _checkNotifications() {
    try {
        const notifications = await listNotifications()
        for (const notification of notifications) {
            const newNotif = await _newNotification(notification)
            if (!newNotif) continue
            await _createNotification(notification)
            await _storeNotification(notification)
        }
    } catch (error) {
        logger.error('failed to list notifications: ', (error as Error).message)
    }
}

browser.notifications.onClicked.addListener(async (id) => {
    await browser.notifications.clear(id)
    await browser.tabs.create({ url: id })
})

// browser.runtime.onStartup.addListener(() => {
//     console.log('runtime started')
//     clearInterval(timer)
//     timer = setInterval(_checkNotifications, _interval)
// })

browser.runtime.onInstalled.addListener(() => setInterval(_checkNotifications, _interval))
