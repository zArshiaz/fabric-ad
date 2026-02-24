export interface AuthRequest {
  password: string;
  username: string;
}

export interface AuthResponse {
  user: UserInfo
}

export interface UserInfo {
  id: string
  name: string
  email: string
  role: string
  phone: string
}
