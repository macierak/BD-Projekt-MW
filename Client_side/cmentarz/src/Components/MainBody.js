import React from 'react'
import Historia from './SubStrona/Historia'
import Pogrzeby from './Pogrzeby'
import Znajdz from './SubStrona/Znajdz'
import Kontakt from './SubStrona/Kontakt'
import Zaloguj from './SubStrona/Zaloguj'
import Aktualnosci from './SubStrona/Aktualnosci'
const MainBody = (props) => {


    return (
        <div className="m-4">
            <div className="w-25  text-center float-start">
                <h3>Klepsydry</h3>
                <Pogrzeby/>                       
            </div>
            <div className="float-end w-75">
                {props.selected === "Historia" ? <Historia/> : <div />} 
                {props.selected === "Znajdź" ? <Znajdz/> : <div />} 
                {props.selected === "Aktualności" ? <Aktualnosci page={1}/> : <div />} 
                {props.selected === "Kontakt" ? <Kontakt/> : <div />} 
                {props.selected === "Zaloguj" ? <Zaloguj/> : <div />} 
                {props.selected === "Panel" ? <Zaloguj/> : <div />} 
            </div>
            
        </div>
    )
}

export default MainBody
