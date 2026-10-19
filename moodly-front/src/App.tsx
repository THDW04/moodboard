import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import AddReferencePage from './pages/AddRef'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <main className="moodly">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ajouter" element={<AddReferencePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App