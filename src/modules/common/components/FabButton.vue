<template>
  <button @click="$emit('click')" :class="['btn btn-circle btn-primary fixed z-50', position]">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
})

defineEmits(['click'])
</script>

<style scoped>
.top-left {
  @apply top-3 left-3;
}
.top-right {
  @apply top-3 right-3;
}
.bottom-left {
  @apply bottom-3 left-3;
}
.bottom-right {
  @apply bottom-3 right-3;
}
</style>
