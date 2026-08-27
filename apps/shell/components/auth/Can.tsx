export default function Can({ permission, children, fallback = null }: { permission: string; children: React.ReactNode; fallback?: React.ReactNode }) {
  // Placeholder: real permission check will be implemented in Phase 5
  const allowed = true
  return <>{allowed ? children : fallback}</>
}
