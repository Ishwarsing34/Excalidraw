"use client"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-[350px] p-6 bg-white rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          {isSignin ? "Welcome Back" : "Create Account"}
        </h2>

        <div className="flex flex-col gap-4 text-black">
          <input
            type="text"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={() => {}}
            className="mt-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all"
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-black">
          {isSignin ? "Don't have an account?" : "Already have an account?"}
        </p>
      </div>
    </div>
  )
}