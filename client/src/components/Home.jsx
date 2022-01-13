import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, filterCountriesByContinent, orderByName, orderByPopulation, getNameCountries} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paged from './Paged';
import SearchBar from './SearchBar';


export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getCountries());
    },[])

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
}

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`)
}

function handleSortPopulation(e){
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`)
}

function handleFilterContinent(e){
    dispatch(filterCountriesByContinent(e.target.value))
}

    return(
        <div>
        <div>
            <Link to='/countries'>Countries</Link>  
            <h1>GO AROUND THE WORLD</h1>
            <button onClick={e=>{handleClick(e)}}>LOAD COUNTRIES</button>
        </div>
        <div>
            <select onChange={e => handleSort(e)}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={e => handleSortPopulation(e)}>
                <option value='hip'>Higher Population</option>
                <option value='smp'>Smaller Population</option>
            </select>
            <select onChange={e => handleFilterContinent(e)}>
                <option value='All'>All</option>
                <option value='Africa'>Africa</option>
                <option value='America'>America</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <select>
            <option value='act'>Tourist Activity</option>
            </select>
            <Paged
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paged={paged}
                />
            <SearchBar/>
            {currentCountries?.map((el)=>{
                return (
                    <fragment>
                        <Link to={'/home/' + el.id}>
                            <Card flagimg={el.flagimg} name={el.name} continent={el.continent} key={el.id}/>
                        </Link>
                    </fragment>
                )
            })}
        </div>
        </div>        

    )
}