import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Home/login";
import Admin from "./pages/Admin/admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
