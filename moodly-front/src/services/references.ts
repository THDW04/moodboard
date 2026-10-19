export interface VisualReference {
  id: number
  title: string
  category: string
  imageUrl: string | null
  sourceUrl: string | null
  notes: string | null
}

const API_URL = 'http://localhost:3333'

export async function getReferences(): Promise<VisualReference[]> {
  const response = await fetch(`${API_URL}/references`)

  if (!response.ok) {
    throw new Error('Impossible de charger les références')
  }

  return response.json()
}