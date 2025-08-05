export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toLocaleString()
  }
  
  if (num < 1_000_000) {
    const thousands = num / 1000
    return thousands % 1 === 0 
      ? `${thousands.toFixed(0)}K`
      : `${thousands.toFixed(1)}K`
  }
  
  if (num < 1_000_000_000) {
    const millions = num / 1_000_000
    return millions % 1 === 0
      ? `${millions.toFixed(0)}M`
      : `${millions.toFixed(1)}M`
  }
  
  const billions = num / 1_000_000_000
  return billions % 1 === 0
    ? `${billions.toFixed(0)}B`
    : `${billions.toFixed(1)}B`
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  return `${remainingSeconds}s`
}