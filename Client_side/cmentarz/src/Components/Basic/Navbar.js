import React, { useState } from 'react'

const Navbar = (props) => {
	const [user, setUser] = useState(null)
	return (
		<div>       
			<nav className="navbar navbar-light bg-light ">
        		<h1 className="p-3">Cmentarz Ostatni Przystanek</h1>
          		<ul className="nav nav-tabs|pills mx-auto gap-5" id="myTab" role="tablist">
				  <li className="nav-item" >
              			<p className="nav-link " onClick={() => props.changeSelected("Aktualności")}>Aktualności</p>
            		</li>
					<li className="nav-item" >
              			<p className="nav-link " onClick={() => props.changeSelected("Znajdź")}>Znajdź</p>
            		</li>
            		<li className="nav-item " >
              			<p className="nav-link" onClick={() => props.changeSelected("Historia")}>Historia</p>
            		</li>
            		<li className="nav-item" >
              			<p className="nav-link" onClick={() => props.changeSelected("Kontakt")}>Kontakt</p>
            		</li>
            		<li className="nav-item" >
						{user 
						? <p className="nav-link" onClick={() => props.changeSelected("Panel")}>Panel</p>
						: <p className="nav-link" onClick={() => props.changeSelected("Zaloguj")}>Zaloguj</p>
						}
              			
            		</li>
          		</ul>        
        	</nav>
      </div>
    )
}

export default Navbar
