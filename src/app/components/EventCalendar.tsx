import clsx from 'clsx'
import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth, subDays } from 'date-fns'
import { useEvents } from '../hooks/useEvents'
import { useLocalStorage } from '../hooks/useLocalStorage'
import EventCard from './EventCard'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface EventCalendarProps {
  currentDate: Date
}

const EventCalendar = ({ currentDate }: EventCalendarProps) => {
  const { eventsByDate } = useEvents(currentDate)
  const { getItem, setItem } = useLocalStorage('events')

  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const startingDayIndex = getDay(firstDayOfMonth)
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  })

  const handleAddEvent = () => {
    const events = getItem()
    if (events) {
      events.push({ date: subDays(currentDate, 6), title: 'Post video', description: 'You must do something' })
      setItem(events)
    } else {
      setItem([{ date: subDays(currentDate, 6), title: 'Post video', description: 'You must do something' }])
    }
    console.log(`Added`)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        {/* <h1 className="mb-4 text-center text-4xl">{format(currentDate, 'MMMM yyyy')}</h1> */}
        <div className="mb-4">
          <button
            className="mt-4  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddEvent}
          >
            Add event
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((day) => (
            <div className="font-bold text-center " key={day}>
              {day}
            </div>
          ))}
          {Array.from({ length: startingDayIndex }).map((_, index) => {
            return <div key={`empty-${index}`} className="border rounded-md p-2 text-center" />
          })}

          {daysInMonth.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const todaysEvents = eventsByDate[dateKey] || []
            return (
              <div
                key={dateKey} // Key is moved here
                className={clsx('border rounded-md p-2 text-center', {
                  'text-red-500': isSameDay(day, currentDate),
                })}
              >
                {format(day, 'd')}
                <EventCard events={todaysEvents} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default EventCalendar
