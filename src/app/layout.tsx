import Navbar from './component/Navbar'
import './globals.css'


export const metadata = {
  title: 'YourName | Web Developer',
  description: 'Portfolio of YourName, a modern web developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
