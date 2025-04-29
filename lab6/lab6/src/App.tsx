
import { Route, Routes } from 'react-router'
import AttendanceTracker from './AttendanceTracker'
import RestaurantOrderingApp from './RestaurantOrderingApp'
import Todo from './Todo'
import Todo2 from './todo2'

function App() {
  return (
    <Routes>
      <Route index element={<AttendanceTracker />} />
      <Route path="restaurant" element={<RestaurantOrderingApp />} />
      <Route path="todo" element={<Todo/>}/>
      <Route path="todo2" element={<Todo2/>}/>

    </Routes>
  )
}

export default App
