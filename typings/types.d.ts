interface CreateUserResult {
  createUser: UserWithToken
}

interface LoginUserResult {
  loginUser: UserWithToken
}

interface User {
  id?: string
  email?: string
  name?: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserWithToken {
  token: string
  user: User
}
