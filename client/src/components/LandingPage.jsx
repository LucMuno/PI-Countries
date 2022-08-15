import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/LandingPage.module.css';
import video from '../components/styles/img/TierraGirando.mp4'

export default function LandingPage(){
    return(
        <div className={style.body}>
            <video className={style.backvideo} src={video} loop muted controls autoPlay>
            </video>    
                
            <div className={style.content}>
             <h1>Let's travel</h1>
             <Link to = '/home'>
                <button>Go!</button>    
             </Link>   
            </div>
        </div>
    )
}