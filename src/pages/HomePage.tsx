import { Button } from "react-bootstrap";
import {useUser} from "../context/user-context"
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const { logout } = useUser();
    const navigate = useNavigate();
    const handleLogout = ()=> {
      navigate('/');
      logout() 
    }
    return (
      <div>
        <h1>Welcome Home!</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }
  
  export default HomePage;
  