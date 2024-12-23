import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const RegisterModal = ({ show, handleClose, switchToLogin }) => {
    const auth = useAuth();
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.formEmail.value;
        const password = e.target.formPassword.value;
        const data = await auth.register(email, password);
        if (data.email) {
            handleClose();
        } else {
            alert("Registration failed. Please try again.");
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create an Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleRegisterSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            minLength={8}
                        />
                        <Form.Text className="text-muted">
                            Password must be at least 8 characters long.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Register
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-primary text-decoration-underline"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleClose();
                            switchToLogin();
                        }}
                    >
                        Login
                    </span>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
