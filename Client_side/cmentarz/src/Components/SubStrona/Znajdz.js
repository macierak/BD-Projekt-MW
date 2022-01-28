import React, { useEffect, useState } from 'react'
import ModalFound from '../Basic/ModalFound'
const Znajdz = () => {

    

    const [param1, setParam1] = useState(null)
    const [param2, setParam2] = useState(null)
    const [param3, setParam3] = useState(null)
    const [found, setFound] = useState(null)

    async function getDateResults(type) {
        if(type){
            console.log(param1)
            await fetch('http://localhost:3321/graves/'+ type +'/'+param1)
            .then(response => response.json())
            .then(json => setFound(json) )
            .then(console.log(found))
        }
          
    }
    async function getNameResults(type) {
        if(type){
            console.log(param1)
            await fetch('http://localhost:3321/graves/'+ type +'/'+param1 + "+"+param2)
            .then(response => response.json())
            .then(json => setFound(json) )
            .then(console.log(found))
        }
          
    }
    async function getPositionResults(type) {
        if(type){
            console.log(param1)
            await fetch('http://localhost:3321/graves/'+ type +'/'+param1 + "+"+param2+ "+"+param3)
            .then(response => response.json())
            .then(json => setFound(json) )
            .then(console.log(found))
        }
          
    }
    function handleChange(event){
        setParam1(event.target.value)
    }
    function handleChange2(event){
        setParam2(event.target.value)
    }
    function handleChange3(event){
        setParam3(event.target.value)
    }


    return (
        <div>     
            
            <ModalFound found={found}/>
            <h4>Wyszukaj po imieniu i nazwisku:</h4>
            <input id='fname' onChange={handleChange}></input>
            <input id='lname' onChange={handleChange2}></input>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getNameResults("name")} >
                Wyszukaj
            </button>
            
        
            <h4>Wyszukaj po lokacji:</h4>
            Aleja  <input type="number"  onChange={handleChange} ></input>
            Rząd   <input type="number"  onChange={handleChange2}></input>
            Pozycja<input type="number"  onChange={handleChange3}></input>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getPositionResults("location")}>
                Wyszukaj
            </button>
        
        
            <h4>Wyszukaj po dacie pogrzebu:</h4>
            <input type="date" id='date' onChange={handleChange}></input>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getDateResults("date")}>
                Wyszukaj
            </button>
            
            
        </div>
    )
}

export default Znajdz
