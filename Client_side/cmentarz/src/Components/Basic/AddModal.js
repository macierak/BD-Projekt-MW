import React, { useState } from 'react';
import List from '../Elements/List';

const AddModal = (props) => {
    const [krypta, setKrypta] = useState(null)
    const [Umowa, setUmowa] = useState(null);
    const [Rodzina, setRodzina] = useState(null);
    const [Grób, setGrób] = useState(null);
    const [Pogrzeb, setPogrzeb] = useState(null);
    const [Pracownik, setPracownik] = useState(null);
    const [Etat, setEtat] = useState(null);
    //const [Zmarły, setZmarły] = useState(null);
    let insertData = {arg1:"", arg2 : "", arg3:"", arg4:"", arg5:"", arg6:""}







    async function getKrypta(){
        await fetch("http://localhost:3321/krypta")
        .then(res => res.json()).then(json => setKrypta(json))

    }
    async function getUmowa(){
        await fetch("http://localhost:3321/umowa")
        .then(res => res.json()).then(json => setUmowa(json))
    }
    async function getRodzina(){
        await fetch("http://localhost:3321/rodzina")
        .then(res => res.json()).then(json => setRodzina(json))
    }
    async function getGrób(){
        await fetch("http://localhost:3321/grób")
        .then(res => res.json()).then(json => setGrób(json))
    }
    async function getPogrzeb(){
        await fetch("http://localhost:3321/pogrzeb")
        .then(res => res.json()).then(json => setPogrzeb(json))
    }
    async function getPracownik(){
        await fetch("http://localhost:3321/pracownik")
        .then(res => res.json()).then(json => setPracownik(json))
    }
    async function getEtat(){
        await fetch("http://localhost:3321/etat")
        .then(res => res.json()).then(json => setEtat(json))
    }
    
    function renderType(type){
        switch(type){
            case "Grób":
                if(!krypta){
                    getKrypta()
                }
                    return(
                <div>
                    Data Postawienia: <input id='arg1' type="date"></input><br/>
                    Aleja: <input id='arg2' type="number"></input><br/>
                    Rząd: <input id='arg3' type="number"></input><br/>
                    Pozycja: <input id='arg4' type="number"></input><br/>
                    Krypta: <select id='arg5'> 
                        {krypta ? krypta.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                </div>
                )      
                
            case "Pogrzeb":
                if(!Grób){
                    getGrób()
                }
                if(!Umowa){
                    getUmowa()
                }
                if(!Rodzina){
                    getRodzina()
                }
                return(
                <div>
                    Grób: <select id='arg1'> 
                        {Grób ? Grób.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                    Firma: <select id='arg2'> 
                        {Umowa ? Umowa.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                    Data: <input type="date" id='arg3'/><br/>
                    Rodzina: <select id='arg4'> 
                        {Rodzina ? Rodzina.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                </div>
                )
                
       
            case "Pracownik":
                if(!Etat){
                    getEtat()
                }
                return(
                <div>
                    Nazwisko: <input id='arg1'></input><br/>
                    Etat: <select id='arg2'> 
                        {Etat ? Etat.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                    Płaca: <input id='arg3'></input><br/>
                    Login: <input id='arg4'></input><br/>
                    Hasło: <input id='arg5' type="password"></input><br/>
                </div>
                )

            case "Rodzina":
                return(
                <div>
                    Nazwisko: <input id='arg1'></input><br/>
                </div>
                )
                
            case "Zmarły":
                if(!Grób){
                    getGrób()
                }
                return(
                <div>
                    Imię: <input id='arg1'></input><br/>
                    Nazwisko: <input id='arg2'></input><br/>
                    Data Urodzenia: <input type="date" id='arg3'></input><br/>
                    Data Śmierci: <input type="date" id='arg4'></input><br/>
                    Cytat: <input id='arg5'></input><br/>
                    Grób: <select id='arg6'> 
                        {Grób ? Grób.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                </div>
                )

            case "Firma":
                return(
                    <div>
                    Nazwa firmy: <input id='arg1'></input><br/>
                    Marża: <input id='arg2' type="number"></input><br/>
                </div>
                )
                
            case "prac-pogrz":
                if(!Pogrzeb){
                    getPogrzeb()
                }
                if(!Pracownik){
                    getPracownik()
                }

                return(
                <div>
                    Pogrzeb: <select id='arg1'> 
                        {Pogrzeb ? Pogrzeb.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                    Pracownik: <select id='arg2'> 
                        {Pracownik ? Pracownik.map((data) => <List data={data}/>)
                                : <option>Ładowanie</option>
                        }
                                
                            </select><br/>
                </div>
                )
                
            case "krypta":
                return(
                    <div>
                    Nazwa: <input id='arg1'></input><br/>
                    
                    </div>
                )                
            default:        return(<div/>)
            
        }
    }
    async function addData(values){
        await fetch("http://localhost:3321/add/"+props.type, {
            method:'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
    }
    const handleSubmit = async e => {
        e.preventDefault()
       
        if(document.getElementById("arg1")){
            insertData.arg1 = document.getElementById("arg1").value
        }if(document.getElementById("arg2")){
            insertData.arg2 = document.getElementById("arg2").value
        }if(document.getElementById("arg3")){
            insertData.arg3 = document.getElementById("arg3").value
        }if(document.getElementById("arg4")){
            insertData.arg4 = document.getElementById("arg4").value
        }if(document.getElementById("arg5")){
            insertData.arg5 = document.getElementById("arg5").value
        }if(document.getElementById("arg6")){
            insertData.arg6 = document.getElementById("arg6").value
        }
        console.log(insertData)
        console.log(props.type)
        
        await addData(insertData)
        
        
    }

    return (
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Formularz dodawania - {props.type}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form method='post' id="formularz" onSubmit={handleSubmit}>
                            {renderType(props.type)}
                            <input type="submit"/>
                        </form>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default AddModal;
