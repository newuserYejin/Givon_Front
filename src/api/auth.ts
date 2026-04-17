import axios from 'axios'
import { apiClient } from '@/api/client'
import type { AuthSession, AuthUser } from '@/types/auth'

export type LoginRequest = {
  email: string
  password: string
}

export type SignupRequest = {
  name: string
  email: string
  password: string
}

type ApiResponse<T> = {
  success: boolean
  data: T
  message: string
}

type ValidationErrorResponse = {
  timestamp?: string
  status?: number
  error?: string
  message?: string
  path?: string
  fieldErrors?: Record<string, string>
}

type LoginResponse = {
  tokenType: 'Bearer'
  accessToken: string
  user: AuthUser
}

type SignupResponse = AuthUser

const unwrap = <T,>(response: ApiResponse<T>) => response.data

export class AuthApiError extends Error {
  status?: number
  fieldErrors?: Record<string, string>
  path?: string

  constructor(message: string, options?: { status?: number; fieldErrors?: Record<string, string>; path?: string }) {
    super(message)
    this.name = 'AuthApiError'
    this.status = options?.status
    this.fieldErrors = options?.fieldErrors
    this.path = options?.path
  }
}

export const isAuthApiError = (error: unknown): error is AuthApiError => {
  return error instanceof AuthApiError
}

const toAuthApiError = (error: unknown) => {
  if (error instanceof AuthApiError) {
    return error
  }

  if (axios.isAxiosError<ValidationErrorResponse>(error)) {
    const response = error.response?.data

    return new AuthApiError(response?.message || '요청 처리에 실패했습니다.', {
      status: response?.status ?? error.response?.status,
      fieldErrors: response?.fieldErrors,
      path: response?.path,
    })
  }

  return new AuthApiError(error instanceof Error ? error.message : '요청 처리에 실패했습니다.')
}

export const login = async (payload: LoginRequest): Promise<AuthSession> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', payload)
    const data = unwrap(response.data)

    return {
      accessToken: data.accessToken,
      user: data.user,
    }
  } catch (error) {
    throw toAuthApiError(error)
  }
}

export const signup = async (payload: SignupRequest): Promise<AuthUser> => {
  try {
    const response = await apiClient.post<ApiResponse<SignupResponse>>('/api/auth/signup', payload)
    return unwrap(response.data)
  } catch (error) {
    throw toAuthApiError(error)
  }
}

export const me = async (): Promise<AuthUser> => {
  try {
    const response = await apiClient.get<ApiResponse<AuthUser>>('/api/auth/me')
    return unwrap(response.data)
  } catch (error) {
    throw toAuthApiError(error)
  }
}
