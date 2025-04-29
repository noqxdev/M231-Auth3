import { useState } from 'react'
import HomePage from './pages/HomePage'
import emailAndPassword from './pages/emailAndPassword'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'about':
        return <emailAndPassword />
      case 'services':
        return <ServicesPage />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      <nav>
        <ul>
          <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
          <li><button onClick={() => setCurrentPage('about')}>Über uns</button></li>
          <li><button onClick={() => setCurrentPage('services')}>Dienstleistungen</button></li>
          <li><button onClick={() => setCurrentPage('contact')}>Kontakt</button></li>
        </ul>
      </nav>

      {renderPage()}
    </div>
  )
}

export default App
