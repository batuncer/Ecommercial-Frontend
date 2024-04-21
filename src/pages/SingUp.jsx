import React from "react";
import LoginGuard from "../auth/LoginGuard";
import { useAuthContext } from "../auth/useAutContext";
import SignUpForm from "../components/auth-components/SingUpForm";


export default function SignUp() {
    const { login, register } = useAuthContext();

    const handleSignup = () => {
        register(token)
    }

    const handleLogin = (token) => {
        login(token);

    }

    return (
        <LoginGuard>
            <Box >
                <div>
                    <SignUpForm handleSignup={handleSignup} handleSlackSignup={handleLogin} />
                </div>
            </Box>
        </LoginGuard>
    );
}
