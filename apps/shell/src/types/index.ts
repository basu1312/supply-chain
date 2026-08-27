export type Role = "ADMIN" | "MANAGER" | "VIEWER";

export type Permission =
  | "VIEW_DASHBOARD"
  | "VIEW_SHIPMENT"
  | "CREATE_SHIPMENT"
  | "UPDATE_SHIPMENT"
  | "DELETE_SHIPMENT"
  | "VIEW_INVENTORY"
  | "UPDATE_INVENTORY"
  | "VIEW_ORDER"
  | "CREATE_ORDER"
  | "UPDATE_ORDER";

export type ShipmentStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Shipment {
  id: number;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  carrier: string;
  expectedDeliveryDate: string; // ISO
  actualDeliveryDate?: string; // ISO
}

export interface InventoryItem {
  id: number;
  sku: string;
  productName: string;
  warehouseId: number;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
}

export type OrderStatus =
  | "CREATED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  customer: string;
  items: { sku: string; quantity: number; unitPrice: number }[];
  createdAt: string;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactEmail?: string;
}

export interface DashboardMetrics {
  totalShipments: number;
  delivered: number;
  inTransit: number;
  delayed: number;
  pending: number;
  totalInventory: number;
  lowStockItems: number;
  totalOrders: number;
  onTimeDeliveryPercent: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  status: number;
}

export interface Pagination<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AuthTokens {
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error?: string | null;
}
