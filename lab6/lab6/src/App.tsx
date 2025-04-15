
import { Route, Routes } from 'react-router'
import AttendanceTracker from './AttendanceTracker'
import RestaurantOrderingApp from './RestaurantOrderingApp'

function App() {
  return (
    <Routes>
      <Route index element={<AttendanceTracker />} />
      <Route path="restaurant" element={<RestaurantOrderingApp />} />
    </Routes>
  )
}

export default App
