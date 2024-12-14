import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task } from '../interfaces/project.interface'

import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  const addProject = (name: string) => {
    if (!name.trim()) return

    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    })
  }

  const addTaskToProject = (taskName: string, taskId: string) => {
    if (!taskName.trim()) return

    const project = projects.value.find((project) => project.id === taskId)

    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
    }
    project?.tasks.push(newTask)
  }

  const toogleTaks = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    const task = project.tasks.find((t) => t.id === taskId)
    if (!task) return
    if (!task.completedAt) {
      task.completedAt = true
    } else {
      task.completedAt = undefined
    }
  }

  const projectsWithCompletion = computed(() => {
    const project = projects.value.map((project) => {
      const completed = project.tasks.reduce((acc, task) => {
        if (task.completedAt) acc++
        return acc
      }, 0)

      const prom = (completed * 100) / project.tasks.length
      const completion = isNaN(prom) ? 0 : prom
      return {
        id: project.id,
        name: project.name,
        taskCount: project.tasks.length,
        completion,
      }
    })

    return project
  })

  const deleteProject = (id: string) => {
    const newProjects = projects.value.filter((p) => p.id !== id)
    projects.value = newProjects
  }

  const deleteTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return
    const newTasks = project.tasks.filter((t) => t.id !== taskId)
    console.log(newTasks.length)
    project.tasks = newTasks
  }

  const handleToogleAllTaks = (e: Event, projectId: string) => {
    const target = e.target as HTMLInputElement
    const checked = target.checked
    const project = projects.value.find((p) => p.id === projectId)

    if (!project) return

    project.isCheckedAll = checked

    project.tasks.forEach((p) => {
      p.completedAt = checked
    })
  }

  return {
    //properties
    projects,
    // Getters
    projectList: computed(() => [...projects.value]),
    isEmptyPrpjects: computed(() => projects.value.length === 0),
    projectsWithCompletion,

    //Actions

    addProject,
    toogleTaks,
    deleteTask,
    deleteProject,
    addTaskToProject,
    handleToogleAllTaks,
  }
})
