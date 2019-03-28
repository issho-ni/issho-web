interface LoginUserResult {
  loginUser: {
    token: string
    user?: User
  }
}

interface User {
  id?: string
  email?: string
  name?: string
  createdAt?: Date
  updatedAt?: Date
}
