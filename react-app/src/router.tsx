import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { AppLayout } from '@/components/layout/AppLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { LandingLayout } from '@/components/layout/LandingLayout'

// ---------------------------------------------------------------------------
// Loading spinner fallback
// ---------------------------------------------------------------------------

function LoadingSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>
  )
}

function withSuspense(Component: React.LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// All pages use default exports → simple lazy(() => import(...))
// ---------------------------------------------------------------------------

// Auth
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage'))
const SetupProfilePage = lazy(() => import('@/features/auth/pages/SetupProfilePage'))

// Public
const AnamnasisPage = lazy(() => import('@/features/public/pages/AnamnasisPage'))
const PublicCheckoutPage = lazy(() => import('@/features/public/pages/PublicCheckoutPage'))

// Landing
const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'))
const LandingCheckoutPage = lazy(() => import('@/features/landing/pages/LandingCheckoutPage'))

// Dashboard
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))

// Students
const StudentsListPage = lazy(() => import('@/features/students/pages/StudentsListPage'))
const StudentCreatePage = lazy(() => import('@/features/students/pages/StudentCreatePage'))
const StudentDashboardPage = lazy(() => import('@/features/students/pages/StudentDashboardPage'))
const OverviewTab = lazy(() => import('@/features/students/tabs/OverviewTab'))
const NutritionTab = lazy(() => import('@/features/students/tabs/NutritionTab'))
const WorkoutTab = lazy(() => import('@/features/students/tabs/WorkoutTab'))
const BiometricsTab = lazy(() => import('@/features/students/tabs/BiometricsTab'))

// Nutrition
const DietsListPage = lazy(() => import('@/features/nutrition/pages/DietsListPage'))
const DietCreatePage = lazy(() => import('@/features/nutrition/pages/DietCreatePage'))
const DietTemplatesListPage = lazy(() => import('@/features/nutrition/pages/DietTemplatesListPage'))
const DietTemplateAssignPage = lazy(() => import('@/features/nutrition/pages/DietTemplateAssignPage'))
const FoodsListPage = lazy(() => import('@/features/nutrition/pages/FoodsListPage'))
const FoodCreatePage = lazy(() => import('@/features/nutrition/pages/FoodCreatePage'))
const NutritionAssessmentPage = lazy(() => import('@/features/nutrition/pages/NutritionAssessmentPage'))

// Workouts
const WorkoutsListPage = lazy(() => import('@/features/workouts/pages/WorkoutsListPage'))
const WorkoutCreatePage = lazy(() => import('@/features/workouts/pages/WorkoutCreatePage'))
const WorkoutTemplatesListPage = lazy(() => import('@/features/workouts/pages/WorkoutTemplatesListPage'))
const WorkoutTemplateAssignPage = lazy(() => import('@/features/workouts/pages/WorkoutTemplateAssignPage'))
const ExercisesListPage = lazy(() => import('@/features/workouts/pages/ExercisesListPage'))
const ExerciseCreatePage = lazy(() => import('@/features/workouts/pages/ExerciseCreatePage'))

// Assessment
const PhysicalAssessmentPage = lazy(() => import('@/features/assessment/pages/PhysicalAssessmentPage'))

// Contracts
const ContractsDashboardPage = lazy(() => import('@/features/contracts/pages/ContractsDashboardPage'))
const ContractCreatePage = lazy(() => import('@/features/contracts/pages/ContractCreatePage'))
const ContractDetailsPage = lazy(() => import('@/features/contracts/pages/ContractDetailsPage'))
const ContractRenewalPage = lazy(() => import('@/features/contracts/pages/ContractRenewalPage'))
const ContractSuccessPage = lazy(() => import('@/features/contracts/pages/ContractSuccessPage'))

// Team
const TeamListPage = lazy(() => import('@/features/team/pages/TeamListPage'))
const TeamCreatePage = lazy(() => import('@/features/team/pages/TeamCreatePage'))
const TeamDetailsPage = lazy(() => import('@/features/team/pages/TeamDetailsPage'))
const TeamCreateSuccessPage = lazy(() => import('@/features/team/pages/TeamCreateSuccessPage'))

// Financial
const FinancialDashboardPage = lazy(() => import('@/features/financial/pages/FinancialDashboardPage'))

// Settings
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'))
const ProfileTab = lazy(() => import('@/features/settings/tabs/ProfileTab'))
const PreferencesTab = lazy(() => import('@/features/settings/tabs/PreferencesTab'))
const BillingTab = lazy(() => import('@/features/settings/tabs/BillingTab'))
const SecurityTab = lazy(() => import('@/features/settings/tabs/SecurityTab'))

// ---------------------------------------------------------------------------
// Router configuration
// ---------------------------------------------------------------------------

export const router = createBrowserRouter([
  // ── Public auth routes ──────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: withSuspense(LoginPage) },
      { path: '/signup', element: withSuspense(SignUpPage) },
      { path: '/setup-profile', element: withSuspense(SetupProfilePage) },
    ],
  },

  // ── Public non-auth routes ──────────────────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: '/anamnesis/:token', element: withSuspense(AnamnasisPage) },
      { path: '/checkout', element: withSuspense(PublicCheckoutPage) },
    ],
  },

  // ── Landing pages ───────────────────────────────────────────────────
  {
    path: '/lp',
    element: <LandingLayout />,
    children: [
      { index: true, element: withSuspense(LandingPage) },
      { path: 'checkout', element: withSuspense(LandingCheckoutPage) },
    ],
  },

  // ── Authenticated app routes ────────────────────────────────────────
  {
    element: <AppLayout />,
    children: [
      // Dashboard
      { path: '/dashboard', element: withSuspense(DashboardPage) },

      // Students
      { path: '/students', element: withSuspense(StudentsListPage) },
      { path: '/students/new', element: withSuspense(StudentCreatePage) },
      {
        path: '/students/:id',
        element: withSuspense(StudentDashboardPage),
        children: [
          { index: true, element: withSuspense(OverviewTab) },
          { path: 'overview', element: withSuspense(OverviewTab) },
          { path: 'nutrition', element: withSuspense(NutritionTab) },
          { path: 'workout', element: withSuspense(WorkoutTab) },
          { path: 'biometrics', element: withSuspense(BiometricsTab) },
        ],
      },

      // Nutrition
      { path: '/nutrition/diets', element: withSuspense(DietsListPage) },
      { path: '/nutrition/diets/new', element: withSuspense(DietCreatePage) },
      { path: '/nutrition/templates', element: withSuspense(DietTemplatesListPage) },
      { path: '/nutrition/templates/assign', element: withSuspense(DietTemplateAssignPage) },
      { path: '/nutrition/foods', element: withSuspense(FoodsListPage) },
      { path: '/nutrition/foods/new', element: withSuspense(FoodCreatePage) },
      { path: '/nutrition/assessment', element: withSuspense(NutritionAssessmentPage) },

      // Workouts
      { path: '/workouts', element: withSuspense(WorkoutsListPage) },
      { path: '/workouts/new', element: withSuspense(WorkoutCreatePage) },
      { path: '/workouts/templates', element: withSuspense(WorkoutTemplatesListPage) },
      { path: '/workouts/templates/assign', element: withSuspense(WorkoutTemplateAssignPage) },
      { path: '/workouts/exercises', element: withSuspense(ExercisesListPage) },
      { path: '/workouts/exercises/new', element: withSuspense(ExerciseCreatePage) },

      // Assessment
      { path: '/assessment/physical', element: withSuspense(PhysicalAssessmentPage) },

      // Contracts
      { path: '/contracts', element: withSuspense(ContractsDashboardPage) },
      { path: '/contracts/new', element: withSuspense(ContractCreatePage) },
      { path: '/contracts/:id', element: withSuspense(ContractDetailsPage) },
      { path: '/contracts/:id/renew', element: withSuspense(ContractRenewalPage) },
      { path: '/contracts/success', element: withSuspense(ContractSuccessPage) },

      // Team
      { path: '/team', element: withSuspense(TeamListPage) },
      { path: '/team/new', element: withSuspense(TeamCreatePage) },
      { path: '/team/:id', element: withSuspense(TeamDetailsPage) },
      { path: '/team/success', element: withSuspense(TeamCreateSuccessPage) },

      // Financial
      { path: '/financial', element: withSuspense(FinancialDashboardPage) },

      // Settings
      {
        path: '/settings',
        element: withSuspense(SettingsPage),
        children: [
          { index: true, element: withSuspense(ProfileTab) },
          { path: 'profile', element: withSuspense(ProfileTab) },
          { path: 'preferences', element: withSuspense(PreferencesTab) },
          { path: 'billing', element: withSuspense(BillingTab) },
          { path: 'security', element: withSuspense(SecurityTab) },
        ],
      },
    ],
  },
])
