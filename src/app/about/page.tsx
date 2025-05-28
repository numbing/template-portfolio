'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      className="min-h-[80vh] flex justify-center items-center"
      style={{ background: '#BDD1BD' }} // match home page
    >
      <main
        className="w-full max-w-3xl py-16 px-8 rounded-xl shadow-lg bg-white flex flex-col"
        style={{
          borderLeft: '8px solid #85B093', // accent light green
        }}
      >
        <motion.h2
          className="text-3xl font-bold mb-8"
          style={{ color: '#173C4C' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          style={{ color: '#326D6C' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          I am a web developer with 3+ years of experience, focused on building performant, accessible, and delightful web applications. My tech stack includes React, Next.js, TypeScript, Tailwind CSS, Node.js, and more.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div>
            <h3 className="font-semibold text-xl mb-2" style={{ color: '#326D6C' }}>
              Skills
            </h3>
            <ul className="list-disc ml-6" style={{ color: '#568F7C' }}>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Node.js / Express</li>
              <li>Tailwind CSS</li>
              <li>REST APIs</li>
              <li>Git & Github</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2" style={{ color: '#326D6C' }}>
              Experience
            </h3>
            <ul className="list-disc ml-6" style={{ color: '#568F7C' }}>
              <li>Frontend Developer @ Startup Inc.</li>
              <li>Freelance Web Projects</li>
              <li>Open Source Contributor</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </section>
  )
}
