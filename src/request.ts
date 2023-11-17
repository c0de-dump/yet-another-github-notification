const formatParams = (params: Record<string, unknown>): string => {
    const arr: string[] = []
    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    return arr.join('&')
}

const _request = (url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<Response> => {
    const u = `${url}?${formatParams(params)}`
    return fetch(u, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
}

const get = (url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<Response> => {
    return _request(url, params, { ...options, method: 'GET' })
}

const post = (url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<Response> => {
    return _request(url, params, { ...options, method: 'POST' })
}

export { get, post }
