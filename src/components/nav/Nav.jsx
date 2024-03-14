'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import './Nav.scss';

function AuthButton () {
    const {data: session} = useSession();
    if (session) {
        return <div id="auth-button">
            <h4>Hello {session.user?.name}!</h4>
            <button onClick={signOut}>Sign Out</button>
        </div>
    }
    return <div id="auth-button">
        <h4>Not Signed In</h4>
        <button onClick={signIn}>Sign In with GitHub</button>
    </div>
};

export default function NavBar () {
    return (
        <div id="nav-bar">
            <h2>{'Created By: '}
                <a href="https://www.linkedin.com/in/brian-lam-software-developer/">Brian Lam</a>
                {' and '}
                <a href="https://www.linkedin.com/in/clarence-smith-nyc/">Clarence Smith</a>
            </h2>
            <AuthButton />
        </div>
    )
}
