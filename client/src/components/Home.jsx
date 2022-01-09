import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries} from '../actions';
import {Link} from 'react-router-dom';


export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((selector) => State.countries)
    useEffect(() => {
        dispatch(getCountries());
    },[])

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
}
    return(
        <div>
            <Link to='/countries'>Countries</Link>  
            <h1>GO AROUND THE WORLD</h1>
            <button onClick={e=>{handleClick(e)}}>LOAD COUNTRIES</button>
        </div>
    )
}