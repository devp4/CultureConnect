import { useState, useEffect } from 'react';
import './App.css';
import './index.css'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Snippet from './components/Snippet';

async function getData() {
  const response = await fetch('/api')
  const data = await response.json()
}


function App() {

  // States 
  const [sideBarState, setsideBarState] = useState(false)
  const [data, setData] = useState([])

  useEffect(getData, [])
  
  return (
    <div className="App">
      <Navbar sideBarState={sideBarState} setsideBarState={setsideBarState}></Navbar>
      {sideBarState ? <Sidebar setsideBarState={setsideBarState} data={data} setData={setData}></Sidebar> : ""}
      {data.map((data) => <Snippet title={data.title} text={data.text} sideBarState={sideBarState} url={data.url}></Snippet>)}
    </div>
  
  )
}

export default App;
