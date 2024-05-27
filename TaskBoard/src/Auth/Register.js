import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser({ name, email, password });
            // Handle successful registration, e.g., redirect to login page
            navigate("/taskboard");
        } catch (error) {
            console.error("Failed to register:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ pt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        Register
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Button
                            variant="text"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
