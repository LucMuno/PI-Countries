import React from "react";
import style from './styles/Card.module.css';
import { FcMultipleCameras } from 'react-icons/fc';
import { useSelector } from 'react-redux';

export default function Card({flagimg, name, continent}){
  
  const countrywithcam = useSelector((state) => state.countryCams)
  var country = {}
  countrywithcam.map((e) => {
    if(e.name == name){
      country = e
    }});
  
    return (
      <div className={style.Card}>
        <div className={style.ImageContainer}>
            <img src={flagimg} alt= "image not found" />
        </div>
        
            <div className={style.TextContainer}>
            <h2 className={style.Text}>{name}</h2>
            <h4 className={style.Text}>Region: {continent}</h4>
            {
              
              country.name?
                
                <FcMultipleCameras size={50} /> 
                 
              :
              <h5 className={style.Text}>View not available</h5>
                
              
               
            }
            
            </div>
             
      </div>
    )
}