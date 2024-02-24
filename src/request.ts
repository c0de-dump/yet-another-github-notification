import debug from './debug'
const logger = debug.extend('request')

const formatParams = (params: Record<string, unknown>): string => {
    const arr: string[] = []
    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    return arr.join('&')
}

const _request = async <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    const u = `${url}?${formatParams(params)}`
    const method = options.method || 'GET'
    const res = await fetch(u, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
    logger.log(`${method.toUpperCase()} ${u} returns ${res.status}`)
    if (!res.ok) {
        throw new Error(`request failed with status code ${res.status}`)
    }
    try {
        return await res.json()
    } catch (error) {
        const err = error as Error
        throw new Error(`failed to parse response from ${url}: ${err.message}`)
    }
}

const get = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    return _request(url, params, { ...options, method: 'GET' })
}

const post = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    return _request(url, params, { ...options, method: 'POST' })
}

export { get, post }
