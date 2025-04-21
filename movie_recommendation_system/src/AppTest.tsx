import { useState, useEffect } from 'react'
import './styles/App.css'

// Define TypeScript interface for user response
interface UserResponse {
  id: number;
  name: string;
  // Add other user properties as needed
}

function AppTest() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitted(true);
    try {
      const response = await fetch(`http://localhost:8000/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Remove the useEffect since we'll fetch on form submit instead

  if (loading && isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Animated background blur effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 animate-pulse group-hover:opacity-100 transition duration-1000"></div>
        
        {/* Main content card */}
        <div className="relative px-14 py-8 bg-black/20 backdrop-blur-xl rounded-lg shadow-2xl">
          <h1 className="text-7xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 animate-text">
              Hello {user?.name || 'Guest'}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-4 text-gray-300 text-xl text-center animate-fade-in">
            Welcome to Movie Recommendation System
          </p>
          
          {/* User ID Input Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex gap-4">
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className="flex-1 px-4 py-2 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-lg 
                hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          {/* User Details */}
          {user && (
            <div className="mt-8 p-4 bg-black/30 rounded-lg backdrop-blur-sm">
              <h3 className="text-white font-semibold">User ID: {user.id}</h3>
              <p className="text-gray-300">Name: {user.name}</p>
            </div>
          )}
          
          {/* Call to action button */}
          <button className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-lg 
            hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppTest