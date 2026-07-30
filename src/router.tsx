import {
  createHashHistory,
  createRouter as createTanStackRouter,
} from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export const router = createTanStackRouter({
  routeTree,
  history: createHashHistory(),
  scrollRestoration: true,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
