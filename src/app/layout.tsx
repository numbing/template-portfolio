import './globals.css'
import { Press_Start_2P } from 'next/font/google'
import Navbar from './component/Navbar'


// Import Press Start 2P with Next.js font optimization
const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pressstart',
  display: 'swap'
})

export const metadata = {
  title: 'YourName | Web Developer Portfolio',
  description: 'Portfolio of YourName, a modern web developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} bg-gray-50 text-gray-900 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
