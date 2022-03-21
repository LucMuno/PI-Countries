import React from "react";
import './styles/Card.css';

export default function Card({flagimg, name, continent}){
    return (
      <div>
        <div className="ImageContainer">
            <img src={flagimg} alt= "image not found" width= "200px" height= "150px"/>
        </div>
            <div className="Text">
            <h2>{name}</h2>
            <h4>{continent}</h4>
            </div>
      </div>
    )
}