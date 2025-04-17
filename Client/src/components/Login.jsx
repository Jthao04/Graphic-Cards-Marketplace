import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Login = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
    const [registerInfo, setRegisterInfo] = useState({ username: "", email: "", password: "" });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerInfo),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! You can now log in.");
                setShowRegister(false);
            } else {
                alert(`Registration failed: ${data.error}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
                setShowLogin(false);
                // Optionally, store the token in localStorage or context
                localStorage.setItem("token", data.token);
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowLogin(true)}>
                Login
            </Button>
            <Button variant="secondary" onClick={() => setShowRegister(true)}>
                Register
            </Button>

            {/* Login Modal */}
            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={loginInfo.email}
                                onChange={(e) =>
                                    setLoginInfo({ ...loginInfo, email: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginInfo.password}
                                onChange={(e) =>
                                    setLoginInfo({ ...loginInfo, password: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Register Modal */}
            <Modal show={showRegister} onHide={() => setShowRegister(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="registerUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={registerInfo.username}
                                onChange={(e) =>
                                    setRegisterInfo({ ...registerInfo, username: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="registerEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={registerInfo.email}
                                onChange={(e) =>
                                    setRegisterInfo({ ...registerInfo, email: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="registerPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={registerInfo.password}
                                onChange={(e) =>
                                    setRegisterInfo({ ...registerInfo, password: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Login;