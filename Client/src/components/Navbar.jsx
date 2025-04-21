import React, { useState } from 'react';
import Login from './Login'; // Combined Login + Register modals
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function AppNavbar() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Graphics Card Marketplace</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/sell">Sell GPU</Nav.Link>
              <Nav.Link as={Link} to="/listings">Browse Listings</Nav.Link>

              {user ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/sell">Sell GPU</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
                  <Nav.Link onClick={() => setShowRegister(true)}>Register</Nav.Link>
                </>
              )}
              <Login
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                showRegister={showRegister}
                setShowRegister={setShowRegister}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;