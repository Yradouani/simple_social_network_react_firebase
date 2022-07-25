import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { useState } from 'react';
import { auth } from '../utils/firebase.config';

const Login = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail.current.value,
                loginPassword.current.value
            )
            console.log(user);
        } catch (error) {
            console.log(error.message);
            setError(true);
        }
        console.log(loginEmail.current.value, loginPassword.current.value);
    }
    return (
        <div className='login-container'>
            <h3>Se connecter</h3>
            <form onSubmit={(e) => handleLogin(e)}>
                {error ? (
                    <p style={{ color: "red" }}>Email ou mot de passe invalide</p>
                ) : ""}

                <input type="email" placeholder='Email' required ref={loginEmail} />
                <input type="password" placeholder='Mot de passe' required ref={loginPassword} />
                <input type="submit" value="Se connecter" className='submit' />
            </form>
        </div >
    );
};

export default Login;