import React, { useState } from 'react'
import AddModal from '../Basic/AddModal'

const Dodawanie = () => {

    const [type, setType] = useState(null)


    return (
        <div>
            <AddModal type = {type}/>
            Dodaj:
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Zmarły")}>Zmarłego</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Firma")}>Firmę</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Grób")}>Grób</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Pracownik")}>Pracownik</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Rodzina")}>Rodzinę</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("Pogrzeb")}>Pogrzeb</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("prac-pogrz")}>Pogrzeb do pracownika</button>
            <button className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target="#addModal" onClick={() => setType("krypta")}>Kryptę</button>
        </div>
    )
}

export default Dodawanie
