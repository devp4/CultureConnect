import './App.css';
import { config } from './firebaseConfig'
import Navbar from './components/Navbar';
import Snippet from './components/Snippet';
import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';
import { getDatabase, connectDatabaseEmulator, ref, onValue, child, get, set } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getFirestore, authDomain } from 'firebase/firestore';
import { type } from '@testing-library/user-event/dist/type';

const app = initializeApp(config);
const db = getDatabase();
const dbRef = ref(getDatabase());
var allSnippets = [];
var allSnippestsCopy = [];
let queriedData = [];

function App() {

  // States
  const [data, setData] = useState([])
  const [sideBarState, setsideBarState] = useState(false)
  let searchText = ""

  // Load snippet when scroll hits bottom
  const loadSnippet = () => {
    for(let i=0; i<2; i++) {
      if (allSnippets.length === 0) {
        setData([...data])
        return
      }
      let index = Math.floor(Math.random() * allSnippets.length)
      let randomSnippet = allSnippets[index];
      allSnippets.splice(index, 1);
      data.push(randomSnippet);
    }

    // Add new data to old data
    setData([...data])
  }

  const handleScroll = (scroll) => {
    if (scroll.target.documentElement.scrollTop + window.innerHeight + 1 >= scroll.target.documentElement.scrollHeight) {
      loadSnippet()
    }
  }

  // Query Snippets 
  const query = (text) => {
    if (text.trim() === "") {
      setData([...allSnippestsCopy])
    }
    
    allSnippestsCopy.forEach(element => {
      if (element.title.toString().toLowerCase().includes(text.toString().toLowerCase())) {
        console.log(element)
        queriedData.push(element)
      }
    })

    setData([...queriedData])
  }


  useEffect(() => {
  
    get(child(dbRef, 'snippets/')).then((snapshot) => {
      let data3 = snapshot.val();
      for (let key in data3) {
        allSnippets.push(data3[key])
        allSnippestsCopy.push(data3[key])
      }

      queriedData = allSnippets

      for(let i=0; i<4; i++){
        let index = Math.floor(Math.random() * allSnippets.length)
        let randomSnippet = allSnippets[index];
        allSnippets.splice(index, 1);
        data.push(randomSnippet);
      }
      setData([...data])
    })
    
    // Listeners
    window.addEventListener('scroll', handleScroll)

    // Enter key pressed in Navbar
    document.querySelector('#searchInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.scrollTo(0, 0);
        queriedData = [];
        searchText = document.getElementById('searchInput').value;
        query(searchText)
      }
    });
  }, [])

  return (
    <div className="App">
      <Navbar sideBarState={sideBarState} setsideBarState={setsideBarState}></Navbar>
      {sideBarState ? <Sidebar setsideBarState={setsideBarState} data={data} setData={setData}></Sidebar> : ""}
      {data.map((data) => <Snippet title={data.title} text={data.text} sideBarState={sideBarState} url={data.url}></Snippet>)}
    </div>
  );
}

export default App;

