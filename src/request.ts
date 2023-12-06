const formatParams = (params: Record<string, unknown>): string => {
    const arr: string[] = []
    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    return arr.join('&')
}

const _request = async <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    const u = `${url}?${formatParams(params)}`
    console.log('request options: ', options)
    const res = await fetch(u, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
    return res.json() as T
}

const get = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    console.log('get options: ', options)
    return _request(url, params, { ...options, method: 'GET' })
}

const post = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    return _request(url, params, { ...options, method: 'POST' })
}

export { get, post }
