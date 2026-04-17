import { api } from "./client"

export type UserRole = "ADMIN" | "SUPPLIER" | "STAFF" | "CLIENT"

export type AuthUser = {
  id: string
  username: string
  email: string
  role: UserRole
}

type LoginResponse = {
  token: string
  user: {
    _id: string
    username: string
    email: string
    role: UserRole
  }
}

type RegisterResponse = {
  _id: string
  username: string
  email: string
  role: UserRole
}

export async function login(email: string, password: string) {
  const res = await api.post<LoginResponse>("/login", { email, password })

  return {
    token: res.data.token,
    user: {
      id: res.data.user._id,
      username: res.data.user.username,
      email: res.data.user.email,
      role: res.data.user.role,
    } satisfies AuthUser,
  }
}

export async function register(username: string, email: string, password: string) {
  const res = await api.post<RegisterResponse>("/register", { username, email, password })
  return {
    id: res.data._id,
    username: res.data.username,
    email: res.data.email,
    role: res.data.role,
  } satisfies AuthUser
}

