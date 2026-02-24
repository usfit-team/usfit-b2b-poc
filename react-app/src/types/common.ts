export interface Pagination {
  page: number
  pageSize: number
  total: number
}

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface NavItem {
  label: string
  href: string
  iconName: string
}
