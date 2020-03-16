import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link href="/" className="brand-logo">Analyzer</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to="/" className="home">Home</NavLink></li>
                            <li><NavLink to="#" className="about">About</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar