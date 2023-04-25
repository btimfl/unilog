import Cookies from 'js-cookie'
import Router from 'next/router'
import toast from 'react-hot-toast'

// const baseURL = 'http://tenant-unilog.unicommerce.com'
const baseURL = 'http://localhost:4005'

const access_token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJhZy52eWFzQHVuaWNvbW1lcmNlLmNvbSIsIlVTRVJfREVUQUlMUyI6eyJ1c2VybmFtZSI6InBhcmFnLnZ5YXNAdW5pY29tbWVyY2UuY29tIiwic2Vzc2lvbklkIjoiMmYzYWQ0Y2ItOWI3OC00NmE1LTliZTMtNzAxZmNmMjA5N2E4IiwidGVuYW50IjoidGVuYW50IiwicHJvZHVjdCI6IlNUQU5EQVJEIiwicm9sZSI6IkFETUlOIn0sImV4cCI6MTY4MjA3Njc2NCwiaWF0IjoxNjgxOTkwMzY0fQ.2XitJFTFNE-eU_-O25mxqEPu0VNJ9hjdHpUziIcLXPRIFtkvdlqXScRd1uwA0FIbfOSBHO647N9C-18tLBiqtg'

const defaultHeaders = new Headers()
defaultHeaders.append('APP-KEY', '#$%^SK&SNLSH*^%SF')
defaultHeaders.append('Content-Type', 'application/json')
defaultHeaders.append('accept', '*/*')
defaultHeaders.append('Authorization', `Bearer ${access_token}`)
export default async function gateway(URL: string, options: RequestInit) {
    if (!Cookies.get('JWT-TOKEN') && URL != 'api/seller/auth_jwt') {
        toast.error(String('401: Unauthenticated User'))
        Router.push(process.env.NEXT_PUBLIC_HOME_ROUTE!)
        return
    } else {
        defaultHeaders.append('JWT-TOKEN', Cookies.get('JWT-TOKEN')!)
    }
    const res = await fetch(`${baseURL}/${URL}`, {
        ...options,
        headers: defaultHeaders,
    })

    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    return text ? JSON.parse(text) : {}
}
