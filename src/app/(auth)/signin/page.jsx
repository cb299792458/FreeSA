"use client";
import Input from "@/components/input/Input";
import axios from "axios";
import { useState } from "react"

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/signin/', {
                email,
                password,
            });
            if (res.data.ok) {
                // these aren't working?
                setEmail('');
                setPassword('');

                const user = res.data.user;
                console.log(user);
                setSuccess(true);

                // handle sign in and redirect here

            } else {
                throw new Error('Error in Authentication');
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <Input type="text" label="Email" id="inputEmail" setState={setEmail}/> 
            <Input type="password" label="Password" id="inputPassword" setState={setPassword}/>
            <p>{error || ''}</p>
            {success
                ? <h1>Authentication Successful</h1>
                : <button type="submit">Submit</button>
            }
        </form>
    )
}
