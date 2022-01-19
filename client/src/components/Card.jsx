import React from "react";
import './styles/Card.css';

export default function Card({flagimg, name, continent}){
    return (
        <div className="Card">
            <img src={flagimg} alt= "image not found" width= "200px" height= "150px"/>
            <h3 className="Name">{name}</h3>
            <h4>{continent}</h4>
        </div>
    )
}