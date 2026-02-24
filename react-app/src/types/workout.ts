export interface ExerciseSet {
  reps: string
  load: string
  rest: string
}

export interface Exercise {
  id: string
  name: string
  category: string
  muscleGroup: string
  equipment: string
  instructions?: string
  sets: ExerciseSet[]
}

export interface WorkoutGroup {
  id: string
  name: string
  exercises: Exercise[]
}

export interface Workout {
  id: string
  name: string
  studentName: string
  status: 'active' | 'draft' | 'expired'
  createdAt: string
  days: WorkoutDay[]
}

export interface WorkoutDay {
  id: string
  name: string
  groups: WorkoutGroup[]
}
