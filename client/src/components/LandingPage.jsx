import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'

export default function LandingPage(){
    return(
        <div className='body'>
             <h1 className='Welcome'>Let's travel around the world</h1>
             <Link to = '/home'>
                <button className='StartButton'>Start</button>    
             </Link>   

        </div>
    )
}