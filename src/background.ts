import browser from 'webextension-polyfill'
import type { Notification } from '@/types/github'
import { ListNotifications } from './github'

const second = 1000
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
    // await browser.storage.local.set({ [notification.id]: notification })
}

async function _checkNotifications() {
    const storage = await browser.storage.sync.get()
    const token = storage['token']
    if (!token) {
        console.debug('empty token from storage')
        return
    }
    const notifications = await ListNotifications(token)
    for (const notification of notifications) {
        await _createNotification(notification)
        await _storeNotification(notification)
    }
}

browser.notifications.onClicked.addListener(async (id) => {
    await browser.notifications.clear(id)
    await browser.tabs.create({ url: id })
})

browser.runtime.onStartup.addListener(() => {
    console.log('runtime started')
    clearInterval(timer)
    timer = setInterval(() => {
        _checkNotifications()
    }, 10 * second)
})

browser.runtime.onInstalled.addListener((details) => {
    console.log('runtime installed: ', JSON.stringify(details, null, 2))
    clearInterval(timer)
    timer = setInterval(() => {
        _checkNotifications()
    }, 10 * second)
})
