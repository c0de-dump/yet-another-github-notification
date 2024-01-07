import browser from 'webextension-polyfill'
import type { Notification } from '@/types/github'
import { listNotifications } from './github'

const second = 1000
const _interval = 10 * second
let timer: NodeJS.Timer

async function _createNotification(notification: Notification) {
    console.log('create notification: ', notification)
    await browser.notifications.create(notification.subscription_url, {
        type: 'basic',
        title: notification.subject.title,
        message: notification.repository.full_name,
        iconUrl: notification.repository.owner.avatar_url as string,
    })
}

async function _storeNotification(notification: Notification) {
    await browser.storage.local.set({ [notification.id]: notification })
}

async function _newNotification(notification: Notification): Promise<boolean> {
    const notifs = await browser.storage.local.get(notification.id)
    const notif = notifs[notification.id]
    return notif === undefined || notif.updated_at !== notification.updated_at
}

async function _checkNotifications() {
    const storage = await browser.storage.sync.get()
    const token = storage['token']
    if (!token) {
        console.debug('empty token from storage')
        return
    }
    const notifications = await listNotifications(token)
    // notifications is not an array when token is invalid
    if (!Array.isArray(notifications)) return
    for (const notification of notifications) {
        console.log('check notification: ', notification)
        if (await _newNotification(notification)) {
            await _createNotification(notification)
            await _storeNotification(notification)
        }
    }
}

browser.notifications.onClicked.addListener(async (id) => {
    await browser.notifications.clear(id)
    await browser.tabs.create({ url: id })
})

browser.runtime.onStartup.addListener(() => {
    console.log('runtime started')
    clearInterval(timer)
    timer = setInterval(_checkNotifications, _interval)
})

browser.runtime.onInstalled.addListener((details) => {
    console.log('runtime installed: ', JSON.stringify(details, null, 2))
    clearInterval(timer)
    timer = setInterval(_checkNotifications, _interval)
})
