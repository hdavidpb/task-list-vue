<template>
  <div ref="containerTableRef" class="w-full m-2 h-[calc(100vh-60px)] overflow-y-scroll">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'No name'" />
    </section>
    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">
                <input
                  v-if="project?.tasks.length !== 0"
                  @change="(e) => projectsStore.handleToogleAllTaks(e, props.id)"
                  :checked="project?.isCheckedAll"
                  type="checkbox"
                  class="checkbox checkbox-primary"
                />
              </th>
              <th>Tarea</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in project?.tasks"
              :class="[
                'hover',
                {
                  'bg-black font-bold text-white': task.completedAt,
                },
              ]"
              :key="task.id"
            >
              <th>
                <input
                  @change="projectsStore.toogleTaks(props.id, task.id)"
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                />
              </th>
              <td>{{ task.name }}</td>
              <th class="flex justify-center items-center w-[40px]">
                <button
                  @click="
                    () => {
                      projectsStore.deleteTask(props.id, task.id)
                      isDelete = true
                    }
                  "
                  :class="[
                    'btn btn-circle text-red-500 border-none',
                    { 'bg-black': task.completedAt },
                  ]"
                >
                  <TrashIcon />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <div class="w-full p-2">
          <input
            ref="inputRef"
            v-model="taskValue"
            @keypress.enter="addTask"
            class="input input-primary w-full opacity-60 transition-all duration-300 hover:opacity-100 focus:opacity-100"
            placeholder="Nueva tarea"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../store/useProjectsStore'

import type { Project } from '../interfaces/project.interface'
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'

interface Props {
  id: string
}
const router = useRouter()
const props = defineProps<Props>()
const containerTableRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isDelete = ref(false)

const taskValue = ref('')

const projectsStore = useProjectsStore()
const project = ref<Project | undefined>()

const addTask = () => {
  projectsStore.addTaskToProject(taskValue.value, props.id)
  taskValue.value = ''
  setTimeout(() => {
    containerTableRef.value?.scrollTo({
      top: 100000,
      behavior: 'smooth',
    })
  }, 300)
}

watch(
  () => props.id,
  () => {
    const findedProject = projectsStore.projectList.find((project) => project.id === props.id)
    project.value = findedProject
    if (!findedProject) return router.replace('/')
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  inputRef.value?.focus()
  setTimeout(() => {
    containerTableRef.value?.scrollTo({
      top: 100000,
      behavior: 'smooth',
    })
  }, 400)
})
</script>
