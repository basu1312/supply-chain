import { Role, Permission } from '../types'

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  VIEWER: [
    'VIEW_DASHBOARD',
    'VIEW_SHIPMENT',
    'VIEW_INVENTORY',
    'VIEW_ORDER'
  ],
  MANAGER: [
    'VIEW_DASHBOARD',
    'VIEW_SHIPMENT',
    'CREATE_SHIPMENT',
    'UPDATE_SHIPMENT',
    'VIEW_INVENTORY',
    'UPDATE_INVENTORY',
    'VIEW_ORDER',
    'CREATE_ORDER',
    'UPDATE_ORDER'
  ],
  ADMIN: [
    // Admin will be treated as having all permissions implicitly in hasPermission, but list common ones for clarity
    'VIEW_DASHBOARD',
    'VIEW_SHIPMENT',
    'CREATE_SHIPMENT',
    'UPDATE_SHIPMENT',
    'DELETE_SHIPMENT',
    'VIEW_INVENTORY',
    'UPDATE_INVENTORY',
    'VIEW_ORDER',
    'CREATE_ORDER',
    'UPDATE_ORDER'
  ]
}

export const hasPermission = (role: Role | undefined | null, permission: Permission): boolean => {
  if (!role) return false
  if (role === 'ADMIN') return true
  const perms = ROLE_PERMISSIONS[role]
  return perms ? perms.includes(permission) : false
}
