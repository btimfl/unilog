// const baseURL = 'https://unilog.unicommerce.com'
const baseURL = 'http://localhost:4003'

export default async function gateway(URL: string, options: RequestInit) {
    const res = await fetch(`${baseURL}/${URL}`, { ...options })

    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    return text ? JSON.parse(text) : {}
}
