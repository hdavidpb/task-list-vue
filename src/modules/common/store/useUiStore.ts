import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const showSideMenu = ref(false)

  return {
    showSideMenu,
  }
})
