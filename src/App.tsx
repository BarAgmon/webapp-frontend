import './App.css'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { UserProvider } from './context/user-context'
import ProtectedRoute from "./pages/ProtectedRoute"
import UserProfile from "./pages/UserProfile";

import HomePage from "./pages/HomePage"

function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App