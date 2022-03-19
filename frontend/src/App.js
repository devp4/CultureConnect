import { useState, useEffect } from 'react';
import './App.css';
import './index.css'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Snippet from './components/Snippet';


function App() {

  // States 
  const [sideBarState, setsideBarState] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect( () => {
    
    // Get Posts from database
    async function getPosts() {
      const response = await fetch('/api/get-posts')
      const data = await response.json()

      var snippets = []

      for (let post in data ){
        snippets.push(data[post])
      }
    }
  
    getPosts()

  }, [])

  
  return (
    <div className="App">
      {console.log(posts)}
      <Navbar sideBarState={sideBarState} setsideBarState={setsideBarState}/>
      {sideBarState ? <Sidebar setsideBarState={setsideBarState} data={posts} setData={setPosts}/> : ""}
      {posts.map((post) => <Snippet title={post.title} text={post.text} sideBarState={sideBarState} url={post.url}/>)}
    </div>
  
  )
}

export default App;
