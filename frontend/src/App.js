import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../src/pages/Dashboard"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import Header from "../src/component/Header"
import AdminDashBoar from "../src/pages/AdminDashBoar"




function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminDashBoar/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
   
    </div>
    </Router>
    <ToastContainer /> 
    </>
  );
}

export default App;
