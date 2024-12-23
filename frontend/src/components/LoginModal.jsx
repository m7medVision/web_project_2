import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const LoginModal = ({ show, handleClose, switchToRegister }) => {
    const auth = useAuth();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;
        const data = await auth.login(email, password);
        if (data.email) {
            handleClose();
        } else {
            alert("Login failed. Please try again.");
        }
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="loginEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group controlId="loginPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100 text-center">
                    Don't have an account?{" "}
                    <span
                        className="text-primary text-decoration-underline"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleClose();
                            switchToRegister();
                        }}
                    >
                        Create one
                    </span>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
