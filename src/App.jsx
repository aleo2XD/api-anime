import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimeFinder from './pages/AnimeFinder.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeFinder />} />
        <Route path="/buscar" element={<AnimeFinder />} />
      </Routes>
    </BrowserRouter>
  )
}
