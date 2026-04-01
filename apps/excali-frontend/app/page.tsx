"use client";

import { motion } from "framer-motion";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Navbar */}
      <nav className="relative flex justify-between items-center w-full max-w-7xl mx-auto px-6 md:px-10 py-6 z-10">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            DrawFlow
          </span>
        </h1>

        <div className="flex gap-3">
          {/* Sign In */}
          <button
            onClick={() => router.push("/signin")}
            className="group relative px-4 md:px-5 py-2 rounded-full border border-gray-300 overflow-hidden text-sm md:text-base cursor-pointer active:scale-95 transition"
          >
            <span className="relative z-10 group-hover:text-white transition">
              Sign In
            </span>
            <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>

          {/* Sign Up */}
          <button
            onClick={() => router.push("/signup")}
            className="group relative px-4 md:px-5 py-2 rounded-full bg-blue-600 text-white overflow-hidden shadow-md text-sm md:text-base cursor-pointer active:scale-95 transition"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[70vh] px-6 max-w-5xl mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Sketch ideas. Collaborate instantly. Build visually.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl"
        >
          A fast, minimal, and powerful whiteboard for teams and creators.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="group relative w-full sm:w-auto px-7 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg overflow-hidden cursor-pointer active:scale-95 transition"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>

          <button className="group relative w-full sm:w-auto px-7 py-3 rounded-full border border-gray-300 font-medium overflow-hidden cursor-pointer active:scale-95 transition">
            <span className="relative z-10 group-hover:text-white transition">
              Live Demo
            </span>
            <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-10 max-w-7xl mx-auto z-10 pb-20">
        <FeatureCard icon="✏️" title="Freehand Drawing" desc="Smooth and natural sketching." />
        <FeatureCard icon="🤝" title="Collaboration" desc="Work together in real-time." />
        <FeatureCard icon="☁️" title="Cloud Sync" desc="Access anywhere anytime." />
        <FeatureCard icon="⚡" title="Fast" desc="Instant performance." />
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center text-center pb-24 px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Start creating today</h2>
        <p className="mt-3 text-gray-600">No setup needed.</p>
        <button
          onClick={() => router.push("/signup")}
          className="group relative px-8 py-3 mt-6 rounded-full bg-blue-600 text-white font-medium shadow-lg overflow-hidden cursor-pointer active:scale-95 transition"
        >
          <span className="relative z-10">Launch App</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        </button>
      </section>
    </div>
  );
}

interface FeatureCard {
  icon : ReactNode,
  title : string ,
  desc : string
}

function FeatureCard({ icon, title, desc }: FeatureCard) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 180 }}
    >
      <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 flex flex-col items-center text-center gap-4 border border-gray-100 hover:shadow-xl transition">
        <div className="text-3xl md:text-4xl">{icon}</div>
        <h3 className="font-semibold text-base md:text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </motion.div>
  );
}