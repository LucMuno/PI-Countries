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
                        <li className='number' key={number}>
                         <button key= {number} onClick={()=> paged(number)}>{number}</button>   
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}