export interface Project {
  id: string
  name: string
  isCheckedAll?: boolean
  tasks: Task[]
}

export interface Task {
  id: string
  name: string
  completedAt?: boolean
}
