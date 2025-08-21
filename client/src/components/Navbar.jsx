// [file name]: Navbar.jsx
// [updated file]
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import LanguageSelector from './LanguageSelector'

const NavLink = ({to, children}) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`px-4 py-2 rounded-2xl font-semibold ${active ? 'bg-emerald-200 text-emerald-900' : 'hover:bg-emerald-100'}`}>
      {children}
    </Link>
  )
}

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="text-xl font-extrabold text-emerald-700">Sentiment Lab</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/play">Play</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/features">Features</NavLink>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  )
}