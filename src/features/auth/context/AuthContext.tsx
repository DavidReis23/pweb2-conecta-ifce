import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '@/features/auth/storages/authUser.storage'
import type { AuthUser } from '@/features/auth/types/dto/AuthDTO'
import { createContext, useContext, useState, type ReactNode } from 'react'

// contex type
type AuthContextType = {
  isAthenticated: boolean
  authUser: AuthUser | null
  setAuthUser: (user: AuthUser) => void
  clearAuthUser: () => void
}

// create context
const AuthContext = createContext<AuthContextType | null>(null)

// context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() =>
    getStoredUser(),
  )

  function setUser(user: AuthUser) {
    setStoredUser(user)
    setAuthUser(user)
  }

  function clearUser() {
    clearStoredUser()
    setAuthUser(null)
  }

  return (
    <AuthContext
      value={{
        isAthenticated: authUser !== null,
        authUser,
        setAuthUser: setUser,
        clearAuthUser: clearUser,
      }}
    >
      {children}
    </AuthContext>
  )
}

// const hook
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'O contexto de autenticação não pode ser acessado fora do AuthProvider',
    )
  }
  return context
}
