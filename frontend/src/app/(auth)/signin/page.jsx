"use client";
import Input from "@/components/input/Input";
import axios from "axios";
// import { redirect } from "next/navigation";
import { useState } from "react"

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sessionUser) console.log('You are logged in as:', sessionUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/api/user/signin`, {
                email,
                password,
            }, {
                headers: {'Content-Type': 'application/json'}
            });
            
            localStorage.setItem('sessionUser', JSON.stringify(res.data.user));
            // redirect('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('sessionUser');
        // redirect('/home');
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