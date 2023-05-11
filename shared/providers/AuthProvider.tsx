import React, { useContext, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useMetadata } from 'shared/queries'

type AuthContextType = {
    allowedURLs: string[]
}
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [allowedURLs, setAllowedURLs] = useState<string[]>([])

    const { data } = useMetadata()

    useEffect(() => {
        if (!data) return

        setAllowedURLs(data.result.allowed_urls)
    }, [data])

    return <AuthContext.Provider value={{ allowedURLs }}>{children}</AuthContext.Provider>
}

export function useAuthProvider() {
    return useContext(AuthContext)
}
