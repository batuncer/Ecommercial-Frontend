import React from "react";
import SignUpForm from "../components/auth-components/SingUpForm";
import { useAuthContext } from "../auth/useAuthContext";

export default function SignUp() {
    const { login, register, token } = useAuthContext();

    const handleSignup = () => {
        register(token);
    }

    const handleLogin = (token) => {
        login(token);
    }

    return (
        <div>
            <SignUpForm handleSignup={handleSignup} handleLogin={handleLogin} />
        </div>
    );
}