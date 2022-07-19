import React from "react";
import style from './styles/Card.module.css';
import { FaVideo } from 'react-icons/fa'

export default function Card({flagimg, name, continent}){
    return (
      <div className={style.Card}>
        <div className={style.ImageContainer}>
            <img src={flagimg} alt= "image not found" width= "200px" height= "150px"/>
        </div>
        
            <div className={style.TextContainer}>
            <h2 className={style.Text}>{name}</h2>
            <h4 className={style.Text}>{continent}</h4>
            <h4><FaVideo/> View available</h4>
            </div>
             
      </div>
    )
}