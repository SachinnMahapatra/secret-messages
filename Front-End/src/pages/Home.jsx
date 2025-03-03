import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen  bg-gray-100">
      {/* Ad Space - Top Banner */}
      <div className="w-full bg-white/10 backdrop-blur-sm p-4 mb-6 rounded-lg mt-4">
        <div className="h-16 flex items-center justify-center border-2 border-dashed border-white/30 rounded-md">
          <p className="text-white/70">Ad Space (Top Banner)</p>
        </div>
      </div>
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center py-8">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Welcome to Secret Message</h1>
        <p className="text-lg mb-8 max-w-md drop-shadow-md">
          Create your unique secret message link and share it anonymously with friends!
        </p>
        <button
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 mb-12"
          onClick={() => navigate("/create-link")}
        >
          Create Your Link
        </button>
        
        {/* Ad Space - Center */}
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-sm p-4 mb-12 rounded-lg">
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-white/30 rounded-md">
            <p className="text-white/70">Ad Space (Center)</p>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
          <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="font-bold text-xl mb-2">Anonymous</h3>
            <p>Send messages without revealing your identity</p>
          </div>
          <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="font-bold text-xl mb-2">Secure</h3>
            <p>Your messages are protected and private</p>
          </div>
          <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="font-bold text-xl mb-2">Easy to Use</h3>
            <p>Simple interface for sharing secret messages</p>
          </div>
        </div>
      </div>
      
      {/* Ad Space - Bottom */}
      <div className="w-full bg-white/10 backdrop-blur-sm p-4 mb-8 rounded-lg">
        <div className="h-20 flex items-center justify-center border-2 border-dashed border-white/30 rounded-md">
          <p className="text-white/70">Ad Space (Bottom Banner)</p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-4 text-center text-white/70 text-sm">
        <p>© 2025 Secret Message. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;