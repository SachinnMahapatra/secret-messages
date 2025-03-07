import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SecretPage from "./pages/SecretMessage";
import CreateLink from "./components/CreateLink";
import SecretMessage from "./pages/SecretMessage";
import MessageList from "./components/MessageList";
import Header from "./components/Header";

// Layout component to wrap routes that should have the header
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Secret Message. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path="/create-link" element={
          <MainLayout>
            <CreateLink />
          </MainLayout>
        } />
        {/* These routes don't need the header */}
        <Route path="/secret/:id" element={<SecretMessage />} />
        <Route path="/messages/:id" element={<MessageList />} />
      </Routes>
    </Router>
  );
}

export default App;
