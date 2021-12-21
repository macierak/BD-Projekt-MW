import Navbar from './Components/Basic/Navbar'
import Footer from './Components/Basic/Footer'
import MainBody from './Components/MainBody'
import React from 'react'


function App() {
	const [selected, setSelected] = React.useState('Parent')
  return (
	<div className="App" >
		<Navbar changeSelected={selected => setSelected(selected)}/>
		
		<MainBody selected={selected}/>
		<br></br><br></br><br></br>
		<Footer	/>
	</div>
  );
}

export default App;
