'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/easter-egg', label: 'Easter Egg' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav
      className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 shadow"
      style={{ backgroundColor: '#BDD1BD' }} // lightest green
    >
      <div
        className="text-2xl font-bold tracking-wide"
        style={{ color: '#173C4C' }} // deep blue-teal
      >
        YourName
      </div>
      <ul className="flex space-x-6">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-lg px-2 py-1 rounded transition`}
              style={{
                color: pathname === link.href ? '#326D6C' : '#173C4C', // active: teal, default: deep blue
                backgroundColor: pathname === link.href ? '#85B093' : 'transparent', // active: light green
                fontWeight: pathname === link.href ? 'bold' : 'normal',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
