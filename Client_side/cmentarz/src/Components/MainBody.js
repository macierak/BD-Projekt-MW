import React, { useRef, useState } from 'react'
import Historia from './SubStrona/Historia'
import Pogrzeby from './Pogrzeby'
import Znajdz from './SubStrona/Znajdz'
import Kontakt from './SubStrona/Kontakt'
import Zaloguj from './SubStrona/Zaloguj'
import Aktualnosci from './SubStrona/Aktualnosci'
import StaffBody from './SubStrona/StaffBody'
import Zarządzanie from './SubStrona/Zarządzanie'
import Dodawanie from './SubStrona/Dodawanie'
import Usuwanie from './SubStrona/Usuwanie'
const MainBody = (props) => {

    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(false)
    const componentMounted = useRef(true);
    const [selected, setSelected] = useState(props.selected)

    function performUpdate(user){
        setloading(true)
        props.changeUser(user)
        setUser(user)
        console.log(user)
        //props.changeSelected("Panel")
        if (componentMounted.current){
            setloading(false)
        }

        return () => {
            componentMounted.current = false
        }
    }

    function renderSwitch(){
        switch(props.selected){
            case "Historia":    return <Historia/>
            case "Znajdź":      return <Znajdz/>
            case "Aktualności": return <Aktualnosci/>
            case "Kontakt":     return <Kontakt/>
            case "Zaloguj":     return <Zaloguj changeUser={user => performUpdate(user)} />
            case "Zarządzanie": return <Zarządzanie />
            case "Dodawanie":   return <Dodawanie />
            case "Usuwanie":    return <Usuwanie />
            default:            return <Aktualnosci />
        }
    }

    return (
        <div className="m-4">
            
             <div className="w-25  text-center float-start">
                 <h3>Klepsydry</h3>
                 <Pogrzeby/>                       
             </div>
            
            
        
            <div className="float-end w-75 p-5">
                {renderSwitch()}
            </div>
            
        </div>
    )
}

export default MainBody
