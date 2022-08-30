import style from './styles/Home.module.css'
import React from 'react';
import { useState, useSelector, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries, getCountries } from '../actions';
import { FaSearch } from 'react-icons/fa';
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';

export default function SearchBar({setCountries}){
    const dispatch= useDispatch();
    const [name, setName] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    console.log("filter", setCountries)
    
    function handleInputChange(e) {
        const searchWord = e.target.value;
        console.log("find",searchWord)
        setName(searchWord);
        e.preventDefault();
        const newFilter = setCountries.filter((el) =>{
          return el.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === ""){
          setFilteredData([]);
        }else{
          setFilteredData(newFilter)
        }
        
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameCountries(name));
        if (!name.length) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops...",
            text: "No se encontró el pais!",
          });
          
        }
        
        setName("");
        setFilteredData([]);
      }
    return(
        <div className={style.navbar}>
            
            <input
            className={style.inputSearch}
            type= 'text'
            placeholder='input country name'
            
            value={name}
            onChange={(e) => handleInputChange(e)}
            />
            <button className= {style.select} type='submit' onClick={(e) => handleSubmit(e)}><FaSearch/></button>
            {filteredData.length != 0 &&(
        <div className={style.dataResult}>
          {filteredData.map((el) => {
          return(
            
                <a className={style.dataItem}>
            <Link style={{textDecoration:"none", color: "white", padding:"8px"}} to={`/home/${el.id}`}>
               <span><img className={style.imagen} src={el.flagimg}/></span>
              <span className={style.title}>{el.name}</span>
             </Link> 
            </a>
           
          )
          })}
        </div>      
      )}
        </div>
    )
}