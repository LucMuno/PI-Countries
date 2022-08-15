import React from "react";
import style from './styles/Card.module.css';
import { FcMultipleCameras } from 'react-icons/fc';
import { getCountryCam} from "../actions";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function Card({flagimg, name, continent}){
  
  const countrywithcam = useSelector((state) => state.countryCams)
  //console.log("aqui", countrywithcam)
  var country = {}
  countrywithcam.map((e) => {
    //console.log(e.name,name)
    if(e.name == name){
      country = e
    }});
  //console.log("paisconCam", country,name)
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