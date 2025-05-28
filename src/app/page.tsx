'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section
      className="min-h-[80vh] flex flex-col justify-center items-center"
      style={{ background: '#BDD1BD' }} // very light green
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span style={{ color: '#173C4C' }}>Hi, I'm </span>
        <span style={{ color: '#326D6C' }}>Your Name</span>
      </motion.h1>
      <motion.p
        className="mt-6 text-lg md:text-2xl text-center max-w-2xl"
        style={{ color: '#568F7C' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        A passionate Web Developer crafting beautiful and performant websites with React, Next.js, and modern web technologies.
      </motion.p>
      <motion.img
        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80"
        alt="Developer portrait"
        className="w-40 h-40 rounded-full mt-8 shadow-lg object-cover"
        style={{
          border: '5px solid #326D6C'
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      />
    </section>
  )
}
