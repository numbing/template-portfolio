'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/easter-egg', label: 'Easter Egg' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 shadow"
      style={{ backgroundColor: '#BDD1BD' }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div
          className="text-2xl font-bold tracking-wide"
          style={{ color: '#173C4C' }}
        >
          YourName
        </div>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden flex flex-col justify-center items-center h-10 w-10 rounded focus:outline-none"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(v => !v)}
        >
          <div className={`h-1 w-7 my-0.5 rounded transition-all`} style={{
            background: '#173C4C',
            transform: open ? "rotate(45deg) translateY(8px)" : "none"
          }} />
          <div className={`h-1 w-7 my-0.5 rounded transition-all`} style={{
            background: '#173C4C',
            opacity: open ? 0 : 1
          }} />
          <div className={`h-1 w-7 my-0.5 rounded transition-all`} style={{
            background: '#173C4C',
            transform: open ? "rotate(-45deg) translateY(-8px)" : "none"
          }} />
        </button>

        {/* Desktop nav */}
        <ul className="hidden sm:flex space-x-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-lg px-2 py-1 rounded transition"
                style={{
                  color: pathname === link.href ? '#326D6C' : '#173C4C',
                  backgroundColor: pathname === link.href ? '#85B093' : 'transparent',
                  fontWeight: pathname === link.href ? 'bold' : 'normal',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile nav menu */}
      <ul
        className={`
          sm:hidden flex flex-col items-center gap-1 bg-[#BDD1BD]
          transition-all duration-300 ease-in-out overflow-hidden
          ${open ? "max-h-96 py-2 border-t border-[#85B093]" : "max-h-0 py-0"}
        `}
        style={{ boxShadow: open ? "0 6px 16px #326D6C22" : undefined }}
      >
        {navLinks.map(link => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              className="block text-lg px-4 py-3 w-full text-center rounded transition"
              style={{
                color: pathname === link.href ? '#326D6C' : '#173C4C',
                backgroundColor: pathname === link.href ? '#85B093' : 'transparent',
                fontWeight: pathname === link.href ? 'bold' : 'normal',
              }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
