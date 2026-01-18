// login, logout API
import { api } from '@/services/api'

export const userLogin = async (data: LoginReq) => await api.login(data)
export const userLogout = async () => await api.logout()