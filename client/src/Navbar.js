import React from 'react'
import {NavLink} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"
const Navbar = () => {
    return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">New Note</NavLink>
                <div class="ml-auto" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <NavLink className="nav-link" exact={true} activeClassName="active nav-link" to="/notes">Notes <span class="sr-only">(current)</span></NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar
