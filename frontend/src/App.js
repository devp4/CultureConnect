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
  var tempPosts = []

  // Filter Post Function
  const filterPosts = (searchTerm) => {

    if (searchTerm.trim() === "") {
      // Set posts back to original posts if blank
      setPosts(tempPosts)
      return
    }
    else {
      getFilteredPosts(searchTerm)
    }


    // Function to get filtered posts
    async function getFilteredPosts(searchTerm) {
      const body = {"search_term": searchTerm.toLowerCase()}
      
      const response = await fetch("/api/search-post", {
        method: "POST", 
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
      })
      
      const data = await response.json()
      var snippets = []
      
      for (let post in data) {
        snippets.push(data[post])
      }

      setPosts(snippets)
    }
  }

  // Website Startup Use Effect (Set Listeners and posts)
  useEffect( () => {
    // Get Posts from database
    async function getPosts() {
      const response = await fetch('/api/get-posts')
      const data = await response.json()

      var snippets = []

      for (let post in data ){
        snippets.push(data[post])
      }

      setPosts(snippets)
      tempPosts = snippets
    }
  
    getPosts()

    // Set Window Listener

    // Listener for when search bar is entered
    document.querySelector("#searchInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        window.scrollTo(0, 0)
        var searchTerm = document.getElementById("searchInput").value
        filterPosts(searchTerm)
      }
    })

  }, [])

  
  return (
    <div className="App">
      <Navbar sideBarState={sideBarState} setsideBarState={setsideBarState}/>
      {sideBarState ? <Sidebar setsideBarState={setsideBarState} data={posts} setData={setPosts}/> : ""}
      {posts.map((post) => <Snippet title={post.title} text={post.text} sideBarState={sideBarState} url={post.url}/>)}
    </div>
  
  )
}

export default App;
