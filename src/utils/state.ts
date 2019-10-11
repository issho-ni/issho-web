export const clearState = (self: React.Component, keys: string[]) => {
  const state = self.state

  for (const key of keys) {
    state[key] = null
  }

  self.setState(state)
}
