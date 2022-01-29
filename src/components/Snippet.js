const Snippet = ({title, text, sideBarState, url}) => {
    return (
        <div>        
        <div className={sideBarState ? "snippetShifted" : "snippet"}>
            <h2 className='snippetHeader'>
                {title}
            </h2>
                <p className="snippetText">{text} <img src={url} alt="" className="image"></img></p>
                <br></br>
            </div>
        </div>
    )
}

export default Snippet