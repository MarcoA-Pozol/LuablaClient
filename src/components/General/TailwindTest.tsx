export const TestTailwind = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl 
                      animate-fade-in animate-duration-1000">
        
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 mb-4">
          Tailwind is alive!
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl text-center">
          Completed config in <span className="text-yellow-400 font-mono">Ubuntu</span>
        </p>
        
        <div className="mt-6 flex gap-4 justify-center">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  )
}
