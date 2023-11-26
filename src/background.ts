import browser from 'webextension-polyfill'
import { ListNotifications } from './github'

async function _checkNotifications() {
    const storage = await browser.storage.sync.get()
    const token = storage['token']
    if (!token) {
        console.debug('empty token from storage')
        return
    }
    const notifications = await ListNotifications(token, { all: true })
    console.log({ notifications })
}

browser.storage.onChanged.addListener(() => {
    console.log('storage changed')
    setTimeout(() => {
        _checkNotifications()
    }, 0)
})
browser.runtime.onStartup.addListener(() => {
    console.log('runtime started')
    setTimeout(() => {
        _checkNotifications()
    }, 0)
})

browser.runtime.onInstalled.addListener(() => {
    console.log('runtime installed')
    setTimeout(() => {
        _checkNotifications()
    }, 0)
})
