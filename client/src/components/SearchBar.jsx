import style from './styles/Home.module.css'
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../actions';
import { FaSearch } from 'react-icons/fa';

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
        <div className={style.navbar}>
            
            <input
            className={style.inputSearch}
            type= 'text'
            placeholder='input country name'
            onChange={(e) => handleInputChange(e)}
            />
            <button className= {style.select} type='submit' onClick={(e) => handleSubmit(e)}><FaSearch/></button>
           
        </div>
    )
}