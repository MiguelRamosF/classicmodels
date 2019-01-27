import React from 'react'
import './css/home.css'


export class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>ClassicModels</h1>
                <h2>Description du projet :</h2>
                <h2 className={"description"}>
                    Notre projet consistait à créer une application, sur le langage de notre choix, sur une base de données NoSQL étudié pendant les cours : MongoDB.
<p>
                        Tout d’abord, une étape de dénormalisation de données SQL à été effectué. En effet, nous sommes partis d’une base de données relationelle qui représente les données d’un magasin de voitures miniaturisés, et que nous avons transformé en JSON pour ensuite l’intégrer de manière dénormalisé dans mongoDB sous différentes collections.
</p>


                    Ensuite nous avons créé une application web codé en full JS avec le stack MERN (Mongoose, Express, React JS, NodeJS). Cette application sert d’interface de visualisation de données pour les requêtes qui seront décrites dans la suite du rapport.
                    
<p>
                        L’application comprend 3 vues :
</p>
                    <p>
                        -	Une vue utilisateur standard : il s’agit de 4 requêtes les plus demandés sur la base de données sans intervention de l’utilisateur.
</p>
                    <p>
                        -	Une vue Analyste/Décisionnaire : il s’agit de 2 requêtes complexes paramétrables par l’utilisateur.
</p>
                    <p>
                        -	Une vue Administrateur : Il fournit des statistiques sur les données.
</p>



                </h2>
                <h2 >
                    Membres de l'équipe:
                </h2>
                <h2 className={"description"}>

                    <p>
                        Alexandre LEVRET
                </p>
                    <p>
                        Maxime TAZI
                </p>
                    <p>
                        Miguel RAMOS
                </p>

                </h2>

                <h2 >
                    Professeur:
                </h2>
                <h2 className={"description"}>

                    <p>
                        Nicolas TRAVERS
                </p>


                </h2>
            </div>
        )
    }
}

