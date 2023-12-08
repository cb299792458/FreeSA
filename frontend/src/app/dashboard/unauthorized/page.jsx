import Link from "next/link";

export default function Unauthorized() {
    return (
        <>
            <h1>You must be logged in as an Administrator</h1>
            <Link href="/signin">Log In</Link>
        </>
    )
}