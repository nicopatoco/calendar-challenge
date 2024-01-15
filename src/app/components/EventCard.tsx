import { useState } from 'react'

export interface CalendarEvent {
  date: Date
  title: string
  description: string
}

interface EventCalendarProps {
  events: CalendarEvent[]
}

const EventCard = ({ events }: EventCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>()

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const closePopup = () => {
    setSelectedEvent(undefined)
  }

  return (
    <>
      <div className="container max-h-32 overflow-auto">
        {events.map((event, index) => (
          <div
            key={`event-${index}`}
            className="p-4 hover:bg-gray-200 cursor-pointer rounded-md text-gray-900"
            onClick={() => handleEventClick(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
      {/* Event Popup with Tailwind styling */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
            <p className="mt-2">{selectedEvent.description}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-4 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default EventCard
