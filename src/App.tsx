import './App.css'
import LoginForm from './pages/Login'
import Register from './pages/Register'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { UserProvider } from './context/user-context'
import ProtectedRoute from "./pages/ProtectedRoute"
import CurrencyExchange from './pages/CurrencyExchange'
import PageWithNavbar from "./components/PageWithNavbar"
import Home from './pages/Home'
import CommentsPage from './pages/CommentPage'

function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register/>} />
          <Route
            path="/comments/:postId"
            element={
              <ProtectedRoute>
                <PageWithNavbar>
                  <CommentsPage />
                </PageWithNavbar>
              </ProtectedRoute>
            }
          />
          <Route path="/currency" element={
            <ProtectedRoute> 
              <PageWithNavbar>
                <CurrencyExchange/>
              </PageWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
             <PageWithNavbar>
                <Home/>
              </PageWithNavbar>
           </ProtectedRoute>
          } />       
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
