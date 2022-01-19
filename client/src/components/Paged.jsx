import './styles/Home.css'
import React from 'react';

export default function Paged({countriesPerPage, allCountries, paged}){
    const pageNumbers = []

    for(let i=1; i<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='paged'>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        
                         <button key= {number} className='btnAdmin' onClick={()=> paged(number)}>{number}</button>   
                        
                    ))
                }
            </ul>
        </nav>
    )

}