import './styles/Home.css'
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../actions';

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        if (name !== ""){
            dispatch(getNameCountries(name));
            setName("");
        } else {
            alert("Input a correct name");
        };
    
    }

    return(
        <div className='SearchBar'>
            <input
            className='HomeInput'
            type= 'text'
            placeholder='input country name'
            onChange={(e) => handleInputChange(e)}
            />
            <button className= 'SearchButton' type='submit' onClick={(e) => handleSubmit(e)}>SEARCH BY NAME</button>
        </div>
    )
}