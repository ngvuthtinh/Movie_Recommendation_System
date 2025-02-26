import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Animated background blur effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 animate-pulse group-hover:opacity-100 transition duration-1000"></div>
        
        {/* Main content card */}
        <div className="relative px-14 py-8 bg-black/20 backdrop-blur-xl rounded-lg shadow-2xl">
          <h1 className="text-7xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 animate-text">
              Hello My Honey
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-4 text-gray-300 text-xl text-center animate-fade-in">
            Welcome to Movie Recommendation System
          </p>
          
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

export default App