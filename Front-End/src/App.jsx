import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SecretPage from "./pages/SecretMessage";
import CreateLink from "./components/CreateLink";
import SecretMessage from "./pages/SecretMessage";
import MessageList from "./components/MessageList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret/:id" element={<SecretMessage />} />
        <Route path="/create-link" element={<CreateLink />} />
        <Route path="/messages/:id" element={<MessageList />} />
      </Routes>
    </Router>
  );
}

export default App;
