import Cookies from 'js-cookie'
import Router from 'next/router'
import toast from 'react-hot-toast'

import DomainHandler from './domain-handler'

const domainResolver = new DomainHandler()
const baseAuthURL = domainResolver.authDomain
const baseAppURL = domainResolver.appDomain

// const access_token =
//     'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJhZy52eWFzQHVuaWNvbW1lcmNlLmNvbSIsIlVTRVJfREVUQUlMUyI6eyJ1c2VybmFtZSI6InBhcmFnLnZ5YXNAdW5pY29tbWVyY2UuY29tIiwic2Vzc2lvbklkIjoiMmYzYWQ0Y2ItOWI3OC00NmE1LTliZTMtNzAxZmNmMjA5N2E4IiwidGVuYW50IjoidGVuYW50IiwicHJvZHVjdCI6IlNUQU5EQVJEIiwicm9sZSI6IkFETUlOIn0sImV4cCI6MTY4MjA3Njc2NCwiaWF0IjoxNjgxOTkwMzY0fQ.2XitJFTFNE-eU_-O25mxqEPu0VNJ9hjdHpUziIcLXPRIFtkvdlqXScRd1uwA0FIbfOSBHO647N9C-18tLBiqtg'

const defaultHeaders = new Headers()
defaultHeaders.append('APP-KEY', '#$%^SK&SNLSH*^%SF')
defaultHeaders.append('Content-Type', 'application/json')
defaultHeaders.append('accept', '*/*')
defaultHeaders.append('AUTH-TYPE', 'jwt_only')

export default async function gateway(URL: string, options: RequestInit, domain?: string) {
    if (!Cookies.get('JWT-TOKEN') && URL.indexOf('api/seller/auth_jwt') === -1) {
        toast.error(String('401: Unauthenticated User'))
        Router.push(process.env.NEXT_PUBLIC_HOME_ROUTE!)
        return
    } else {
        if (!defaultHeaders.has('JWT-TOKEN') && !defaultHeaders.has('jwt-token')) {
            defaultHeaders.append('JWT-TOKEN', Cookies.get('JWT-TOKEN')!)
            defaultHeaders.append('Authorization', `Bearer ${Cookies.get('JWT-TOKEN')!}`)
        }
    }

    const baseUrl = !!domain ? domainResolver.findDomain(domain) : baseAppURL

    const res = await fetch(`${baseUrl}/${URL}`, {
        ...options,
        headers: defaultHeaders,
    })

    if (res.status !== 200) {
        toast.error(`${res.status} error for path /${URL}.`, {
            position: 'top-right',
        })
        return {}
    }

    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    return text ? JSON.parse(text) : {}
}

export async function initAuth(URL: string, options: RequestInit) {
    const res = await fetch(`${baseAuthURL}/${URL}`, {
        ...options,
        headers: defaultHeaders,
    })
    if (res.status !== 200) {
        toast.error(`${res.status} error for path /${URL}.`)
        return {}
    }
    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    return text ? JSON.parse(text) : {}
}
