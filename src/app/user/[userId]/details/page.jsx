export default function UserProfile({ params }){
    const { userId } = params;

    return(
        <h1>User Details {userId}</h1>
    )
}