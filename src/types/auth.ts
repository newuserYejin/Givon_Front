export type UserRole = 'DONOR' | 'ADMIN' | 'ORGANIZATION'

export type AuthUser = {
  email: string
  role: UserRole
  name: string
}

export type AuthSession = {
  accessToken: string
  user: AuthUser
}
