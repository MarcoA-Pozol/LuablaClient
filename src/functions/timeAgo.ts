// utils/timeAgo.ts
export function timeAgo(isoDate: string): string {
  const now = new Date().getTime()
  const past = new Date(isoDate).getTime()

  // Validation
  if (isNaN(past)) {
    return "invalid date"
  }

  const diffMs = now - past

  if (diffMs < 0) {
    return "just now"
  }

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years >= 1) return `${years}y ago`
  if (months >= 1) return `${months}m ago`
  if (weeks >= 1) return `${weeks}w ago`
  if (days >= 1) return `${days}d ago`
  if (hours >= 1) return `${hours}h ago`
  if (minutes >= 1) return `${minutes}m ago`

  return "just now"
}
