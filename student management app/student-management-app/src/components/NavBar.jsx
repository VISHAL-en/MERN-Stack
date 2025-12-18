import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './nav.css'

const navItems = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/add', label: 'Add', emoji: '➕' },
  { to: '/students', label: 'Students', emoji: '🎓' },
  { to: '/about', label: 'About', emoji: 'ℹ️' },
  { to: '/login', label: 'Login', emoji: '🔐' },
]

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('nav-collapsed') === 'true'
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('nav-collapsed', collapsed)
    } catch (e) {
      // ignore
    }
  }, [collapsed])

  return (
    <nav className={`nav ${collapsed ? 'nav--collapsed' : ''}`} role="navigation" aria-label="Main navigation">
      <ul className="nav-inner">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="emoji" aria-hidden="true">{item.emoji}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="nav-toggle"
        aria-label={collapsed ? 'Open navigation' : 'Collapse navigation'}
        aria-pressed={collapsed}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? '☰' : '📌'}
      </button>
    </nav>
  )
}
