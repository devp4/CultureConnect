async function createPost(postData) {
    const response = await fetch("/api/create-post", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(postData)
        }
    )

    return response
}

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
        
        const response = createPost(postData)

        response.then((response) => {

            // Check if response was valid
            if (response.status === 200){
                // Add post to Data
                data.push(postData)
                setData(data)
                
                alert("Post Created Successfully")
                setsideBarState(false)
            }
            else {
                alert("Count Not Create Post")
                setsideBarState(true)
            }
        })
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