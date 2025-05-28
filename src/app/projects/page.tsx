'use client'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: 'https://your-portfolio.com'
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site using React, Node.js, and Stripe.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Blog Platform',
    description: 'A Markdown blog platform with user authentication.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
]


export default function Projects() {
  return (
    <section
      className="min-h-[80vh] flex justify-center items-center"
      style={{ background: '#BDD1BD' }}
    >
      <main className="w-full max-w-6xl py-16 px-6 rounded-xl shadow-lg bg-white">
        <motion.h2
          className="text-3xl font-bold mb-12"
          style={{ color: '#173C4C' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              href={project.link}
              key={project.title}
              className="rounded-xl shadow-lg bg-white flex flex-col hover:scale-105 transition transform hover:shadow-2xl relative group overflow-hidden"
              style={{
                borderLeft: '8px solid #326D6C'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded-t-lg h-40 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-xl mb-2" style={{ color: '#173C4C' }}>
                  {project.title}
                </h3>
                <p className="text-base mb-4" style={{ color: '#568F7C' }}>
                  {project.description}
                </p>
                <span
                  className="mt-auto text-sm font-medium"
                  style={{
                    color: '#326D6C'
                  }}
                >
                  View Project →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </main>
    </section>
  )
}
