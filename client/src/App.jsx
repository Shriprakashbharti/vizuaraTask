// [file name]: App.jsx
// [updated file]
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { LanguageProvider } from './context/LanguageContext'

function AppContent() {
  const { pathname } = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      {pathname !== '/lab' && <Footer />}
    </div>
  )
}

export default function App(){
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}