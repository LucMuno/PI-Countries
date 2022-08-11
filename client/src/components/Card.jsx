import React from "react";
import style from './styles/Card.module.css';
import { FaVideo } from 'react-icons/fa';
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
            <img src={flagimg} alt= "image not found" width= "200px" height= "150px"/>
        </div>
        
            <div className={style.TextContainer}>
            <h2 className={style.Text}>{name}</h2>
            <h4 className={style.Text}>{continent}</h4>
            {
              
              country.name?
                
                <h4><FaVideo style={{color: "aqua"}}/> View available</h4>
                 
              :
              <h4>View not available</h4>
                
              
               
            }
            
            </div>
             
      </div>
    )
}