import React from 'react';
import LoginForm from '../components/auth-components/LoginForm';



const Login = ({ onSubmit }) => {
    const onSubmit = (data) => {
        console.log("submit", data);
    }
    return (
        <div maxWidth="sm">
            <h2>Login Page</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}

export default Login;
