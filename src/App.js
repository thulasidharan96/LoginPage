import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashBoard from "./Pages/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="*" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;