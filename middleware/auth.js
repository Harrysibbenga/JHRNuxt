export default function ({ store, redirect, route }) {
  const user = store.state.users.user
  const blockedRoute = /\/dashboard\/*/g
  const loginRoute = '/login'

  if (!user && route.path.match(blockedRoute)) {
    redirect('/login')
  }

  if (user && route.path === loginRoute) {
    redirect('/dashboard')
  }
}
