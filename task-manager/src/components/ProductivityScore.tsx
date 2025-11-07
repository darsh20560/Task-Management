import React, { useEffect, useState } from 'react'

interface ProductivityScoreData {
  id: number
  score: number
  lastReset: string
}

interface ProductivityScoreProps {
  completedCount: number
}

const API_URL = 'http://localhost:3001/productivityScore/1'

const ProductivityScore: React.FC<ProductivityScoreProps> = ({ completedCount }) => {
  const [scoreData, setScoreData] = useState<ProductivityScoreData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch productivity score')
        return res.json()
      })
      .then(data => {
        setScoreData(data)
    })
      .catch(err => setError(err.message))
  }, [])

  useEffect(() => {
    if (!scoreData) return
    const now = new Date()
    const lastResetDate = new Date(scoreData.lastReset)
    const daysDiff = (now.getTime() - lastResetDate.getTime()) / (1000 * 3600 * 24)

    // reset score weekly
    if (daysDiff >= 7) {
      const updatedData = { score: 0, lastReset: now.toISOString() }
      updateScoreToAPI(updatedData)
    }
    // reset score if completedCount has changed
    else if (completedCount != scoreData.score) {
      const updatedData = { score: completedCount }
      updateScoreToAPI(updatedData)
    }

  }, [completedCount, scoreData])

  const updateScoreToAPI = (updatedData: Partial<ProductivityScoreData>) => {
    if (!scoreData) return
    fetch(API_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update productivity score')
        return res.json()
      })
      .then(updatedScore => {
      setScoreData(prev => (prev ? { ...prev, ...updatedScore } : updatedScore))
    })
      .catch(err => setError(err.message))
  }

  if (error) return <div>Error: {error}</div>
  if (!scoreData) return <div>Loading productivity score...</div>

  return (
    <div>
        Productivity Score: {scoreData.score}
    </div>
)
}

export default ProductivityScore