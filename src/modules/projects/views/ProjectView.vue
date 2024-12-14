<template>
  <div ref="containerRef" class="overflow-auto w-full h-[calc(100vh-100px)]">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Lista</th>
          <th>Cantidad</th>
          <th>Avance de completadas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, idx) in projectsStore.projectsWithCompletion"
          class="hover"
          :key="project.id"
          @click="navigateToTasks(project.id)"
        >
          <th>{{ idx + 1 }}</th>
          <td class="capitalize">{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
          </td>
          <td>
            <button
              @click.stop="projectsStore.deleteProject(project.id)"
              class="btn btn-circle text-red-500"
            >
              <TrashIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <InputModal
    title="Nombre de la lista"
    subtitle=""
    @value="projectsStore.addProject"
    :open="openModal"
    @close="openModal = false"
  />

  <CustomModal :open="customModalOpen">
    <template #header>
      <h1>Hola Mi tosita ❤️</h1>
    </template>
    <template #body>
      <p>
        Quiero recordarte lo mucho que te amo, eres muy pero muy importante para mi. Eres el amor de
        mi vida, mi priciosita hermosa. ✨❤️❤️.
      </p>
      <img
        class="w-full h-[300px] object-contain mt-1"
        src="https://res.cloudinary.com/dcgvgeoqe/image/upload/v1734140785/my_images/20241205_214316_uzvijm.webp"
      />
    </template>
    <template #actions>
      <div class="w-full flex justify-end items-center gap-2">
        <button class="btn btn-secondary" @click="customModalOpen = false">Aceptar</button>
      </div>
    </template>
  </CustomModal>

  <FabButton @click="openModal = true">
    <AddCircle />
  </FabButton>

  <FabButton @click="customModalOpen = true" position="bottom-left">
    <OpenModalIcon />
  </FabButton>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FabButton from '@/modules/common/components/FabButton.vue'
import InputModal from '@/modules/common/components/InputModal.vue'
import AddCircle from '@/modules/common/icons/AddCircle.vue'
import CustomModal from '@/modules/common/components/CustomModal.vue'
import OpenModalIcon from '@/modules/common/icons/OpenModalIcon.vue'
import { useProjectsStore } from '../store/useProjectsStore'
import { useRouter } from 'vue-router'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'

const router = useRouter()

const projectsStore = useProjectsStore()

const containerRef = ref<HTMLDivElement | null>(null)
const openModal = ref(false)
const customModalOpen = ref(false)

const navigateToTasks = (id: string) => router.push(`/project/${id}`)

watch(projectsStore.projects, () => {
  setTimeout(() => {
    containerRef.value?.scrollTo({
      top: 100000,
      behavior: 'smooth',
    })
  }, 300)
})
</script>
