const formatParams = (params: Record<string, unknown>): string => {
    const arr: string[] = []
    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    return arr.join('&')
}

const _request = async <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    const u = `${url}?${formatParams(params)}`
    const res = await fetch(u, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })
    let data
    try {
        data = await res.json()
    } catch (error) {
        console.error(`failed to parse response from ${url}: `, error)
        throw new Error(`failed to parse response from ${url}`)
    }
    if (!res.ok) {
        throw new Error(`request failed with status code ${res.status}: ${data?.message}`)
    }
    return data as T
}

const get = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    return _request(url, params, { ...options, method: 'GET' })
}

const post = <T>(url: string, params: Record<string, unknown>, options: RequestInit = {}): Promise<T> => {
    return _request(url, params, { ...options, method: 'POST' })
}

export { get, post }
