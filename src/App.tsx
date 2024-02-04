import './App.css'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import {Routes, Route, BrowserRouter} from "react-router-dom"
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
