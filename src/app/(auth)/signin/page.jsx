"use client";
import Input from "@/components/input/Input";
import { useState } from "react"

export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form>
            <h1>Sign In</h1>
            <Input type="text" label="Email" id="inputEmail" setState={setEmail}/> 
            <Input type="password" label="Password" id="inputPassword" setState={setPassword}/> 
        </form>
    )
}