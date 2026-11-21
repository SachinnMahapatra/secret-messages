import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateLink from "./components/CreateLink";
import SecretMessage from "./pages/SecretMessage";
import MessageList from "./components/MessageList";
import Header from "./components/Header";
import TermsPage from "./pages/TermsPage";

const MainLayout = ({ children }) => (
  <div className="app-layout">
    <Header />
    <main className="app-main">{children}</main>
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" to="/" aria-label="MystMessage home">
          <span className="brand-mark" aria-hidden="true">m</span>
          <span>MystMessage</span>
        </Link>
        <span className="footer-note">A little more honest. A little less exposed.</span>
        <span className="footer-copy">© {new Date().getFullYear()} MystMessage</span>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/create-link" element={<MainLayout><CreateLink /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />
        <Route path="/secret/:id" element={<SecretMessage />} />
        <Route path="/messages/:id" element={<MessageList />} />
      </Routes>
    </Router>
  );
}

export default App;
