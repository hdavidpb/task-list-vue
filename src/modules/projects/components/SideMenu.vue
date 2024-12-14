<template>
  <aside
    class="bg-base-200 md:w-72 w-full absolute md:static z-10 hidden md:block h-[calc(100vh-60px)] overflow-y-auto"
  >
    <h2 class="text-lg font-bold mx-4">
      <RouterLink to="/">Listas:</RouterLink>
    </h2>
    <p v-if="projectStore.isEmptyPrpjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>
    <!-- Menú -->
    <ul v-else class="menu rounded-box w-56">
      <li
        v-for="project in projectStore.projectList"
        :key="project.id"
        @click="isOpenSummary = !isOpenSummary"
      >
        <template v-if="project.tasks.length > 0">
          <RouterLink class="mt-2" :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsStore } from '../store/useProjectsStore'
import { useUiStore } from '@/modules/common/store/useUiStore'

const isOpenSummary = ref(false)
const projectStore = useProjectsStore()
const uistore = useUiStore()
</script>
