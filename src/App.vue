<template>
  <layout v-if="mainStore.hasLogin" />
  <Login v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import layout from '@/components/config/Index.vue'
import Login from '@/pages/login/Login.vue'
import { useMainStore } from '@/store/mian'

export default defineComponent({
  name: 'App',
  components: {
    layout,
    Login,
  },
  setup() {
    const mainStore = useMainStore()
    return {
      mainStore,
    }
  },
})
</script>

<style></style>
