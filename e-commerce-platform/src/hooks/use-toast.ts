// Simple toast implementation for demo purposes
export function toast({ title, description }: { title: string; description?: string }) {
  if (typeof window !== "undefined") {
    window.alert(`${title}${description ? ": " + description : ""}`)
  }
}
