import { doc } from "firebase/firestore"
import { set, ref, getDatabase, push, child, update } from "firebase/database"
import { initializeApp } from "firebase/app";
import { config } from '../firebaseConfig'

const app = initializeApp(config);
const db = getDatabase();
const dbRef = ref(getDatabase());

const Sidebar = ({setsideBarState, data, setData}) => {
    
    const updateForm = () => {
        var formData = {} 
        formData.title = document.getElementById('inputTitle').value
        formData.text = document.getElementById('textInput').value
        formData.url = document.getElementById('urlInput').value

        if (formData.title === '') {
            alert("Title can not be blank")
            return
        }

        if (formData.text === '') {
            alert("Description can not be blank")
            return
        }
        const postData = {
            title: formData.title,
            text: formData.text,
            url: formData.url
        };

        const newPostKey = push(child(ref(db), 'snippets')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/snippets/' + newPostKey] = postData;
        
        let newData = [formData]
        setData([...newData, ...data])
        setsideBarState(false)
        update(ref(db), updates);
    }

    return (
        <div className="sidebar">
            <h1>Title</h1>
            <input id="inputTitle" className="titleInput" autoComplete="off" spellCheck="false" type="text" placeholder=""></input>
            <h1>Description</h1>
            <textarea id="textInput" className="description"></textarea>
            <h1>Image URL</h1>
            <input id="urlInput" className="titleInput" autoComplete="off" spellCheck="false" type="text" placeholder=""></input>
            <button className="postButton" onClick={() => {updateForm()}}>Post</button>
        </div>
    )
}

export default Sidebar 