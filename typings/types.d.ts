interface CreateTodoResult {
  __typename: string
  createTodo: Todo
}

interface CreateUserResult {
  createUser: UserWithToken
}

interface GetTodosResult {
  getTodos: Todo[]
}

interface LoginUserResult {
  loginUser: UserWithToken
}

interface Todo {
  __typename?: string
  id?: string
  text?: string
  createdAt?: Date
  updatedAt?: Date
  completedAt?: Date
}

interface UpdateTodoResult {
  __typename: string
  updateTodo: Todo
}

interface User {
  __typename?: string
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
