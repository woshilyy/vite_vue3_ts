import router from '@/router'

export function useRoute() {
  return router.currentRoute
}

export function useRouter() {
  return router
}
