import './App.css'
import LoginForm from './pages/Login'
import Register from './pages/Register'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { UserProvider } from './context/user-context'
import ProtectedRoute from "./pages/ProtectedRoute"
import CurrencyExchange from './pages/CurrencyExchange'
import HomePage from "./pages/HomePage"
import Profile from './pages/Profile'

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
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/currency" element={
          <ProtectedRoute>
            <CurrencyExchange/>
          </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App