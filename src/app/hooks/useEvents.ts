import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { CalendarEvent } from '../components/EventCard'
import { useLocalStorage } from './useLocalStorage'

export const useEvents = (currentDate: Date) => {
  const { getItem } = useLocalStorage('events')
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: CalendarEvent[] }>({})
  const [lastEvents, setLastEvents] = useState<CalendarEvent[] | undefined>()

  useEffect(() => {
    const events: CalendarEvent[] = getItem() // Fetch events

    // Check if events have changed to avoid infinite re-render
    if (JSON.stringify(events) !== JSON.stringify(lastEvents)) {
      const formattedEvents = events.reduce((acc: { [key: string]: CalendarEvent[] }, event) => {
        const date = new Date(event.date)
        const dateKey = format(date, 'yyyy-MM-dd')
        acc[dateKey] = acc[dateKey] || []
        acc[dateKey].push(event)
        return acc
      }, {})

      setEventsByDate(formattedEvents)
      setLastEvents(events)
    }
  }, [getItem, lastEvents])

  return { eventsByDate }
}

// Real way to do it
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// export const useEvents = () => {
//   const [events, setEvents] = useState<CalendarEvent[]>([])
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     setLoading(true)
//     axios
//       .get<ApiResponse>('https://example.com/api/events')
//       .then((response) => setEvents(response.data.data))
//       .catch((error) => setError('An error occurred'))
//       .finally(() => setLoading(false))
//   }, [])

//   return { events, loading, error }
// }
