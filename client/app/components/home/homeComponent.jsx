import React from 'react'
import './css/home.css'


export class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Mongo Web App</h1>
                <h2>Project description :</h2>
                <h2 className={"description"}>
                    Project de Développement d'Application Cloud. 
                </h2>
            </div>
        )
    }
}

