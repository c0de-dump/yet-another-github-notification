import { get } from './request'
import browser from 'webextension-polyfill'
import type { ListNotificationParams, GitHubNotification } from '@schema'

const BASE_URL = 'https://api.github.com'

async function _getToken() {
    const storage = await browser.storage.sync.get()
    const token = storage['token']
    if (!token) {
        throw new Error('empty token from storage')
    }
    return token
}

async function _clearToken() {
    await browser.storage.sync.remove('token')
}

function _createHeaders(token: string) {
    const headers = new Headers()
    headers.append('Accept', 'application/vnd.github+json')
    headers.append('X-GitHub-Api-Version', '2022-11-28')
    headers.append('Authorization', `Bearer ${token}`)

    // Headers don't work with spread operator,
    // so we need to convert it to a plain object
    const result = {} as Record<string, string>
    for (const [key, value] of headers.entries()) {
        result[key] = value
    }
    return result
}

async function listNotifications(params?: ListNotificationParams): Promise<GitHubNotification[]> {
    const token = await _getToken()
    if (!token) {
        console.error('empty token')
        return []
    }
    try {
        const headers = _createHeaders(token)
        const queryParams = { ...params, all: false }
        if (queryParams.per_page && queryParams.per_page > 50) {
            queryParams.per_page = 50
        }
        return await get(`${BASE_URL}/notifications`, queryParams, { headers })
    } catch (error) {
        const msg = error instanceof Error ? error?.message : `unknown type <${typeof error}>`
        await _clearToken()
        throw new Error(msg)
    }
}

async function markThreadAsRead(id: string): Promise<void> {
    const token = await _getToken()
    if (!token) {
        console.error('empty token')
        return
    }
    try {
        const headers = _createHeaders(token)
        await get(`${BASE_URL}/notifications/threads/${id}`, {}, { headers })
    } catch (error) {
        const msg = error instanceof Error ? error?.message : `unknown type <${typeof error}>`
        await _clearToken()
        throw new Error(msg)
    }
}

export { listNotifications, markThreadAsRead }
