import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'kingjames' && password === 'GOAT') {
            localStorage.setItem('currentUser', username);
            onLogin(username);
            alert('Welcome Admin');
        } else if (localStorage.getItem(username) === password) {
            localStorage.setItem('currentUser', username);
            onLogin(username);
            alert(`Welcome ${username}`);
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <span onClick={onSwitchToRegister}>Register here</span>
            </p>
        </div>
    );
};

export default Login;
