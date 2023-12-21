"use client";
import Input from "@/components/input/Input";
import axios from "axios";
import { useState } from "react"
import { signIn } from 'next-auth/react';

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            console.log('Login Successful', result);

        } catch (error) {
            console.error(error);
        };
    };

    const logout = () => {
        
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <Input type="text" label="Email" id="inputEmail" setState={setEmail}/> 
                <Input type="password" label="Password" id="inputPassword" setState={setPassword}/>
                <button type="submit">Submit</button>
            </form>

            <button onClick={logout} >Log Out</button>
        </>
    )
};