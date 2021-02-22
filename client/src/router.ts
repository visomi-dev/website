import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router'

const pages = import.meta.glob('./pages/**/*.vue')

const routes = Object.keys(pages).map((path) => {
  let name = '';

  const matchedResult = path.match(/\.\/pages(.*)\.vue$/);

  if (matchedResult) {
    const [, fileName] = matchedResult

    name = fileName.toLowerCase()
  }

  return {
    path: name === '/home' ? '/' : name,
    component: pages[path],
  }
})

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
