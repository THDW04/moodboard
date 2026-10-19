import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import AddReferencePage from './pages/AddRef'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <main className="moodly">
        <header className="moodly-header">
          <h1>Moodly<span>.</span></h1>
          <p>Ton espace d'inspiration créative.</p>

          <nav>
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/ajouter">Ajouter une ref</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ajouter" element={<AddReferencePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App