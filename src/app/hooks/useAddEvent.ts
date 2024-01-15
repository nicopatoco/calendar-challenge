import { useState } from 'react'
import axios from 'axios'
import { CalendarEvent } from '../components/EventCard'

export const useAddEvent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const addEvent = async (eventData: CalendarEvent) => {
    try {
      const response = await axios.post('https://example.com/api/events', eventData)
      return response.data
    } catch (err: any) {
      setError(err.message || 'Something went wrong!')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { addEvent, isLoading, error }
}
