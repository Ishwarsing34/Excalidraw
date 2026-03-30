"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Navbar */}
      <nav className="relative flex justify-between items-center px-10 py-6 max-w-7xl mx-auto z-10">
        <h1 className="text-2xl font-bold tracking-tight hover:tracking-wider transition-all duration-300">
          DrawFlow
        </h1>
        <div className="flex gap-4">
          <button className="group relative px-5 py-2 rounded-full border border-gray-300 overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition">
              Sign In
            </span>
            <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>

          <button className="group relative px-5 py-2 rounded-full bg-blue-600 text-white overflow-hidden shadow-md">
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center mt-24 px-6 max-w-4xl mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Sketch ideas. Collaborate instantly. Build visually.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl"
        >
          A simple, fast, and beautiful whiteboard tool inspired by Excalidraw.
        </motion.p>

        <div className="flex gap-5 mt-10">
          <button className="group relative px-7 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>

          <button className="group relative px-7 py-3 rounded-full border border-gray-300 font-medium overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition">
              Live Demo
            </span>
            <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-28 px-8 max-w-7xl mx-auto relative z-10">
        <FeatureCard icon="✏️" title="Freehand Drawing" desc="Draw naturally with smooth strokes." />
        <FeatureCard icon="🤝" title="Real-time Collaboration" desc="Work together instantly." />
        <FeatureCard icon="☁️" title="Cloud Sync" desc="Access anywhere anytime." />
        <FeatureCard icon="⚡" title="Lightning Fast" desc="Optimized for speed." />
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center text-center mt-32 pb-24 px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold">Start creating today</h2>
        <p className="mt-4 text-gray-600">No downloads. Just draw.</p>
        <button className="group relative px-8 py-3 mt-6 rounded-full bg-blue-600 text-white font-medium shadow-lg overflow-hidden">
          <span className="relative z-10">Launch App</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.07, rotate: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center gap-5 border border-gray-100 hover:shadow-2xl transition duration-300">
        <div className="text-4xl group-hover:scale-110 transition">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
