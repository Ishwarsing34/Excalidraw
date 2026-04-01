"use client"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

      {/* Background blobs (same vibe as landing) */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-200 rounded-full blur-3xl opacity-30"></div>

      {/* Card */}
      <div className="relative w-[360px] p-8 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {isSignin ? "Welcome Back" : "Create Account"}
          </span>
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
          />

          {/* Button */}
          <button
            onClick={() => {}}
            className="group relative mt-2 w-full py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg overflow-hidden cursor-pointer active:scale-95 transition"
          >
            <span className="relative z-10">
              {isSignin ? "Sign In" : "Sign Up"}
            </span>

            {/* Gradient hover overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>
        </div>

        {/* Footer text */}
        <p className="text-sm text-center mt-6 text-gray-600">
          {isSignin ? "Don't have an account?" : "Already have an account?"}
        </p>

      </div>
    </div>
  )
} 