import React, { useState } from 'react'
import ModalRaport from '../Basic/ModalRaport'

const Zarządzanie = () => {

    const [data, setData] = useState(null)

    async function getRaportData(raport){
        if(raport){
            await fetch("http://localhost:3321/raportData/"+raport)
            .then(res => res.json()).then(res => setData(res))  
        }
        
    }


    return (
        <div>
            <ModalRaport data = {data}/>
            Pokaż raport:
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#raportModal" onClick={() => getRaportData("zarobki")}>Zarobki firm w ciągu roku</button>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#raportModal" onClick={() => getRaportData("pogrzeby")}>Ilość pogrzebów w roku</button>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#raportModal" onClick={() => getRaportData("najlepsi")}>Najlepsi pracownicy z tygodnia</button>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#raportModal" onClick={() => getRaportData("rodziny")}>Rodziny, które mają najwięcej zmarłych</button>
        </div>
    )
}

export default Zarządzanie
