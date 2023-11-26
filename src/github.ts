import { get } from './request'
import type { ListNotificationsParams, Notification } from '@/types/github'

const BASE_URL = 'https://api.github.com'

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

async function ListNotifications(token: string, params: Partial<ListNotificationsParams>): Promise<Notification[]> {
    const headers = _createHeaders(token)
    return await get(`${BASE_URL}/notifications`, params, { headers })
}

export { ListNotifications }
