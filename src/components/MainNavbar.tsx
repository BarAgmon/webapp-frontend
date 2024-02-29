import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useUser} from "../context/user-context"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import styled from 'styled-components';
import coinImg from "../../src/assets/coin.png";

function MainNavbar() {
  const [showProfileModal, setShowProfileModal] = useState(false)
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = ()=> {
    navigate('/login');
    logout() 
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
          <Logo rel="icon" src={coinImg} />
            Treasure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinksSpan>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/currency">Currency-Calc</Nav.Link>
              </LinksSpan>             
            </Nav>
            <SpacedRow>
                <Button onClick={() => setShowProfileModal(true)} variant="outline-light"> 
                  <i className="bi bi-person-circle"/>
                </Button>
                <Button onClick={handleLogout} variant="outline-light">
                  <i className="bi bi-box-arrow-right"/>
                </Button>
              </SpacedRow>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <EditProfileModal show={showProfileModal} setShow={setShowProfileModal}/>
    </>   
  );
}

export default MainNavbar;


const Logo = styled.img`
  height: 1.5em;
  width: 1.5em;
  margin-right: 0.5em;
`

const LinksSpan = styled.span`
  display: flex;
  flex-direction: row;
`

const SpacedRow = styled.div`
  width: 7em;
  display: flex;
  justify-content: space-between;
`