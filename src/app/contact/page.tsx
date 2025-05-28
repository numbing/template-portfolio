'use client'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center"
      style={{ background: '#BDD1BD' }}
    >
      <main className="w-full max-w-xl py-14 px-8 rounded-2xl shadow-lg bg-white flex flex-col items-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: '#173C4C' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's Work Together!
        </motion.h2>
        <motion.p
          className="mb-10 text-center text-lg"
          style={{ color: '#326D6C' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          I’m open to collaborations, freelance work, or just a friendly chat.<br />
          Reach out to me anytime:
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <a
            href="mailto:youremail@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl shadow transition hover:scale-105"
            style={{ backgroundColor: '#85B093', color: '#173C4C', fontWeight: 600 }}
          >
            <Mail size={24} /> Email Me
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl shadow transition hover:scale-105"
            style={{ backgroundColor: '#326D6C', color: '#fff', fontWeight: 600 }}
          >
            <Github size={24} /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl shadow transition hover:scale-105"
            style={{ backgroundColor: '#173C4C', color: '#fff', fontWeight: 600 }}
          >
            <Linkedin size={24} /> LinkedIn
          </a>
        </div>
      </main>
    </section>
  )
}
