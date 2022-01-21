import React, { useRef, useState } from 'react'
import StaffBody from './StaffBody';

const Zaloguj = (props) => {

    const[login, setLogin] = useState(null);
    const[pwd, setPwd] = useState(null);
    const[user, setUser] = useState(null)
    const[loading, setloading] = useState(false)
    const componentMounted = useRef(true);

    async function loginUser(cred) {
        if(cred){
            await fetch("http://localhost:3321/login", {
                method:'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(cred)
            }).then(res => res.json())
            .then(res => setUser(res))           
        }     
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setloading(true)

        await loginUser({login, pwd})
        console.log(user);
        if(user){
            setUser(user)
            props.changeUser(user)
            console.log("znaleziono");
        }else{
            console.log("Nie znaleziono");
        }
            
        if (componentMounted.current){
            setloading(false)
        }

        return () => {
            componentMounted.current = false
        }
        
    }
    if(user){
        props.changeUser(user)
        return (
            <div >
                <StaffBody user={user}/>
                
            </div>
        )
    }else{
        return (
            <div className="login-wrapper">
        
                <h1>Logowanie</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                    <p>Login</p>
                    <input type="text" onChange={e => setLogin(e.target.value)}/>
                    </label>
                    <label>
                    <p>Hasło</p>
                    <input type="password" onChange={e => setPwd(e.target.value)} />
                    </label>
                    <div>
                    <button type="submit">Submit</button>
                    </div>
                </form>
        </div>
        )
    }
    
}

export default Zaloguj
