import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div style={headerBack}>
                <div style={headerContainer}>
                <h1 style={headerStyle}>React.Js.News</h1>
                <p  style={pStyle}>Powered by: <a className="headerA" href="https://newsapi.org/">Newsapi.org</a></p>
                </div>
            </div>
        )
    }
}

const headerBack = {
    background: "grey",
    margin: "0",
    boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.25)",
}

const headerContainer = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "10px"
}

const headerStyle = {
    color: "white",
    margin: "0"
}

const pStyle = {
    color: "white",
    margin: "0"
}


export default Header
