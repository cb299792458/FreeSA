const { useState, createContext, useContext } = require("react")

export const UserContext = createContext();

export const useUserContext = useContext(userContext);


export default function UserProvider(props){
    const [user, setUser] = useState(null);

    return(
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}