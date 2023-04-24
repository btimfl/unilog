// const baseURL = 'http://tenant-unilog.unicommerce.com'
const baseURL = 'http://localhost:4005'

const access_token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJhZy52eWFzQHVuaWNvbW1lcmNlLmNvbSIsIlVTRVJfREVUQUlMUyI6eyJ1c2VybmFtZSI6InBhcmFnLnZ5YXNAdW5pY29tbWVyY2UuY29tIiwic2Vzc2lvbklkIjoiMmYzYWQ0Y2ItOWI3OC00NmE1LTliZTMtNzAxZmNmMjA5N2E4IiwidGVuYW50IjoidGVuYW50IiwicHJvZHVjdCI6IlNUQU5EQVJEIiwicm9sZSI6IkFETUlOIn0sImV4cCI6MTY4MjA3Njc2NCwiaWF0IjoxNjgxOTkwMzY0fQ.2XitJFTFNE-eU_-O25mxqEPu0VNJ9hjdHpUziIcLXPRIFtkvdlqXScRd1uwA0FIbfOSBHO647N9C-18tLBiqtg'

export default async function gateway(URL: string, options: RequestInit) {
    const res = await fetch(`${baseURL}/${URL}`, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${access_token}` },
    })

    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    return text ? JSON.parse(text) : {}
}
