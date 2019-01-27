import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './css/mainLayout.css'
import { Link } from "react-router-dom";

export class MainLayoutComponent extends React.Component {
    render() {
        return (
            <Menu id={"slide"}>
                <Link to="/">Home</Link>
                <Link to="/utilstandard">Utilisateur standard</Link>
                <Link to="/utilanalyste">Analyste/Décisionnaire</Link>
                <Link to="/administrateur">Administrateur</Link>
            </Menu>
        )
    }
}

