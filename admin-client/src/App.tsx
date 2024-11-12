import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.js"
import InputField from "./components/InputField.js"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/test" element={<InputField label="" placeholder="" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
