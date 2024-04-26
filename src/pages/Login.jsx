import React from 'react';
import LoginForm from '../components/auth-components/LoginForm';



const Login = () => {
    const onSubmit = (data) => {
        console.log("submit", data);
    }
    return (
        <div maxWidth="sm">
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}

export default Login;
