import Navbar from './Components/Basic/Navbar'
import Footer from './Components/Basic/Footer'
import MainBody from './Components/MainBody'
import React from 'react'

function App() {
	const [selected, setSelected] = React.useState('Parent')
	const [user, setUser] = React.useState();
	const	[loading, setloading] = React.useState(false)
    const componentMounted = React.useRef(true);

	function performUpdate(user){
        setloading(true)
        if (componentMounted.current){
            setloading(false)
        }
        return () => {
            componentMounted.current = false
        }
    }

	return (
		<div className="App" >
			<Navbar user={user} changeUser={user => setUser(user)} changeSelected={selected => setSelected(selected)}/>
			<MainBody user={user} selected={selected} changeSelected={selected => setSelected(selected)} changeUser={user => setUser(user)}/>
			
			<br></br><br></br><br></br>
			<Footer	/>
		</div>
	);

}

export default App;
