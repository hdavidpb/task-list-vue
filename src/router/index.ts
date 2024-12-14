import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsLayout,
      children: [
        {
          path: '',
          name: 'projects',
          component: () => import('@/modules/projects/views/ProjectView.vue'),
        },
        {
          path: 'project/:id',
          name: 'project',
          component: () => import('@/modules/projects/views/ProjectViewDetail.vue'),
          props: true,
        },
      ],
    },
  ],
})

export default router
