"use client";
import Input from "@/components/input/Input";
import axios from "axios";
import { useState } from "react"

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/signup/', {
                email,
                displayName,
                password,
            });
            if (res.data.ok) {
                // these aren't working?
                setEmail('');
                setDisplayName('');
                setPassword('');

                const user = res.data.newUser;
                console.log(user);
                setSuccess(true);

                // handle sign in and redirect here

            } else {
                throw new Error('Error in Registration');
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
            <Input type="text" label="Display Name" id="inputDisplayName" setState={setDisplayName}/>
            <Input type="password" label="Password" id="inputPassword" setState={setPassword}/>
            <p>{error || ''}</p>
            {success
                ? <h1>Registration Successful</h1>
                : <button type="submit">Submit</button>
            }
        </form>
    )
}
