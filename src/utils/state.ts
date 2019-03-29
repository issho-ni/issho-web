export const clearState = (self: React.Component, keys: string[]) => (
  data: any
) => {
  const state = {}

  for (const key of keys) {
    state[key] = null
  }

  self.setState(state)
  return data
}
