import React, { useEffect, useState } from 'react'

const Pogrzeb = (props) => {
  
    const [person, setPerson] = useState(null)

    useEffect(() =>{
        getData()
        async function getData(){
            await fetch('http://localhost:3321/deaths/soonest')
            .then(response => response.json())
            .then(json => setPerson(json[props.id]))  
            
        }
    })
    if(person){
        return(
            <div className="bg-light">
                Z bólem serca informujemy, że dnia<h4>{person.data_pogrzebu}</h4> 
                {person.imie.endsWith("a") ? "zmarła": "zmarł"}
                <h3> {!person ? "Ładowanie..." : person.imie + " " + person.nazwisko}</h3>
            </div>
        );
    }else{
        return (
            <div className="bg-light">
                Ładowanie...
            </div>
        )
    }
        

    
}

export default Pogrzeb
