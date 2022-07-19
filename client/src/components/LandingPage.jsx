import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={style.body}>
             <h1 className={style.Welcome}>Let's travel around the world</h1>
             <Link to = '/home'>
                <button className={style.StartButton}>Start</button>    
             </Link>   

        </div>
    )
}