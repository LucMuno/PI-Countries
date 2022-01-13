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
        dispatch(getNameCountries(name))
    }

    return(
        <div>
            <input
            type= 'text'
            placeholder='search...'
            onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}