import React from "react";
const Navbar = ({sideBarState, setsideBarState}) => {

    const onButtonClick = (sideBarState) => {
        if (sideBarState) {
            setsideBarState(false)
        }
        else {
            setsideBarState(true)
        }
    } 

    return(
        <div className="navbar">
            <button className="button" onClick={() => {onButtonClick(sideBarState)}}>{sideBarState ? "-" : "+"}</button>
            <h2>Culture Connect</h2>
            <input id="searchInput" autoComplete="off" spellCheck="false" type="search" placeholder="Search..."></input>
        </div>    
    )
}

export default Navbar