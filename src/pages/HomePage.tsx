import { Button } from "react-bootstrap";
import {useUser} from "../context/user-context"

function HomePage() {
    const { logout } = useUser()
    return (
      <div>
        <h1>Welcome Home!</h1>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
  
  export default HomePage;
  