import React from "react";

export default function Card({flagimg, name, continent}){
    return (
        <div>
            <img src={flagimg} alt= "image not found" width= "200px" height= "150px"/>
            <h3>{name}</h3>
            <h4>{continent}</h4>
        </div>
    )
}