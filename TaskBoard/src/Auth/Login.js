import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ email, password });
            // Handle successful login, e.g., save token to local storage
            localStorage.setItem("token", response.token);
            localStorage.setItem("email", response.email);
            localStorage.setItem("name", response.name);
            navigate("/taskboard"); // Redirect to the task board
        } catch (error) {
            console.error("Failed to login:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ pt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        <Button
                            variant="text"
                            onClick={() => navigate("/register")}
                        >
                            Register here
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
