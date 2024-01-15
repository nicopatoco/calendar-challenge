'use client'
import EventCalendar from './components/EventCalendar'

const App = () => {
  const currentDate = new Date()
  // const currentDate = new Date(2024, 0, 10)
  return (
    <div className="bg-white">
      <EventCalendar currentDate={currentDate} />
    </div>
  )
}

export default App
