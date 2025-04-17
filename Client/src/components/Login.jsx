const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginInfo),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            setShowLogin(false);
            localStorage.setItem("token", data.token);
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
};