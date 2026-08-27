import { Shipment, InventoryItem, Order, DashboardMetrics, User } from '../types'

// Simple in-memory DB for development only. This lives in module scope and will be reset when server restarts.
let shipmentId = 3
export const shipments: Shipment[] = [
  {
    id: 1,
    trackingNumber: 'SC-0001',
    status: 'DELIVERED',
    origin: 'Shanghai, CN',
    destination: 'Los Angeles, US',
    carrier: 'Maersk',
    expectedDeliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    actualDeliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 2,
    trackingNumber: 'SC-0002',
    status: 'IN_TRANSIT',
    origin: 'Hamburg, DE',
    destination: 'New York, US',
    carrier: 'Hapag-Lloyd',
    expectedDeliveryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString()
  }
]

let inventoryId = 3
export const inventory: InventoryItem[] = [
  { id: 1, sku: 'SKU-001', productName: 'Widget A', warehouseId: 1, quantity: 120, reorderLevel: 50, unitPrice: 12.5 },
  { id: 2, sku: 'SKU-002', productName: 'Widget B', warehouseId: 1, quantity: 8, reorderLevel: 20, unitPrice: 7.25 }
]

let orderId = 2
export const orders: Order[] = [
  { id: 1, orderNumber: 'ORD-1001', status: 'SHIPPED', customer: 'Acme Corp', items: [{ sku: 'SKU-001', quantity: 10, unitPrice: 12.5 }], createdAt: new Date().toISOString() }
]

export const warehouses = [
  { id: 1, name: 'Main Warehouse', location: 'Los Angeles' }
]

export const suppliers = [
  { id: 1, name: 'Supplier A', contactEmail: 'supA@example.com' }
]

export const users: User[] = [
  { id: 101, name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' },
  { id: 102, name: 'Manager User', email: 'manager@example.com', role: 'MANAGER' },
  { id: 103, name: 'Viewer User', email: 'viewer@example.com', role: 'VIEWER' }
]

export const calculateMetrics = (): DashboardMetrics => {
  const totalShipments = shipments.length
  const delivered = shipments.filter(s => s.status === 'DELIVERED').length
  const inTransit = shipments.filter(s => s.status === 'IN_TRANSIT').length
  const delayed = shipments.filter(s => s.status === 'IN_TRANSIT' && new Date(s.expectedDeliveryDate).getTime() < Date.now()).length
  const pending = shipments.filter(s => s.status === 'PENDING').length
  const totalInventory = inventory.reduce((sum, it) => sum + it.quantity, 0)
  const lowStockItems = inventory.filter(i => i.quantity <= i.reorderLevel).length
  const totalOrders = orders.length
  const onTimeDeliveryPercent = totalShipments === 0 ? 100 : Math.round((delivered / totalShipments) * 100)
  return { totalShipments, delivered, inTransit, delayed, pending, totalInventory, lowStockItems, totalOrders, onTimeDeliveryPercent }
}
