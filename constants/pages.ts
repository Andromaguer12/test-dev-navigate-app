export const pagesConfig = {
  '/user-dashboard': {
    isPrivate: true,
    redirect: '/'
  },
  '/': {
    isPrivate: false,
    redirect: ''
  },
  '/register': {
    isPrivate: false,
    redirect: ''
  }
}