import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.js"
import Dashboard from "./pages/Dashboard.js"
import Sidebar from "./components/Sidebar.js"
import AddCampaign from "./pages/AddCampaign.js"
import AddBlog from "./pages/AddBlog.js"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute.js"
import AddGalleryImage from "./pages/AddGalleryImage.js"
import CampaignDetails from "./pages/CampaignDetails.tsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/test" element={<ProtectedRoute><Sidebar><CampaignDetails /></Sidebar></ProtectedRoute>} />
          <Route path="/add-campaign" element={<ProtectedRoute><Sidebar><AddCampaign /></Sidebar></ProtectedRoute>} />
          <Route path="/add-blog" element={<ProtectedRoute><Sidebar><AddBlog /></Sidebar></ProtectedRoute>} />
          <Route path="/add-gallery-image" element={<ProtectedRoute><Sidebar><AddGalleryImage /></Sidebar></ProtectedRoute>} />
          <Route path={'/dashboard'} element={<ProtectedRoute><Sidebar><Dashboard /></Sidebar></ProtectedRoute>} />
          <Route path={'/detailed-campaign'} element={<ProtectedRoute><Sidebar><CampaignDetails /></Sidebar></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
