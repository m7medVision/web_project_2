import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import CreateJobModal from "./CreateJobModal";

export const Navigation = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Job Board</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>All Jobs</Nav.Link>
              </LinkContainer>
              {!loading && user && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/applications">
                    <NavDropdown.Item>Applications</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item>
                    <CreateJobModal />
                  </NavDropdown.Item>
                  <LinkContainer to="/my-jobs">
                    <NavDropdown.Item>My Jobs</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              {!loading && !user && (
                <>
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={handleLoginShow}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleRegisterShow}
                  >
                    Create an Account
                  </Button>
                </>
              )}
              {!loading && user && (
                <div className="d-flex align-items-center gap-3">
                  <NavDropdown
                    title={`Welcome, ${user.email}`}
                    id="user-nav-dropdown"
                    align="end"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as="button" onClick={() => auth.logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RegisterModal
        show={showRegister}
        handleClose={handleRegisterClose}
        switchToLogin={() => {
          handleRegisterClose();
          handleLoginShow();
        }}
      />

      <LoginModal
        show={showLogin}
        handleClose={handleLoginClose}
        switchToRegister={() => {
          handleLoginClose();
          handleRegisterShow();
        }}
      />
    </>
  );
};