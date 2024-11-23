import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.js"
import Dashboard from "./pages/Dashboard.js"
import Sidebar from "./components/Sidebar.js"
import AddCampaign from "./pages/AddCampaign.js"
import AddBlog from "./pages/AddBlog.js"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute.js"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/test" element={<Sidebar><Dashboard /></Sidebar>} />
          <Route path="/add-campaign" element={<Sidebar><AddCampaign /></Sidebar>} />
          <Route path="/add-blog" element={<ProtectedRoute><Sidebar><AddBlog /></Sidebar></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
