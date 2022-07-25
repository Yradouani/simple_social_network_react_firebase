import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const ConnectModal = () => {
    const [signUp, setSignUp] = useState(true);
    return (
        <div className='connect-modal'>
            <div className="header-btn">
                <button style={{ background: signUp ? "rgb(37, 33, 33)" : "rgb(56, 47, 47)" }}
                    onClick={() => setSignUp(true)}>S'inscrire</button>
                <button style={{ background: signUp ? "rgb(56, 47, 47)" : "rgb(37, 33, 33)" }}
                    onClick={() => setSignUp(false)}>Se connecter</button>
            </div>
            {signUp ? <SignUp /> : <Login />}
        </div>
    );
};

export default ConnectModal;