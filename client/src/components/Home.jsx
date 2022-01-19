import './styles/Home.css'
import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries,filterCountriesByContinent,getActivity,orderByName,orderByPopulation,filterCountryByActivity } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paged from './Paged';
import SearchBar from './SearchBar';



export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry =  currentPage * countriesPerPage 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const activityName = activities?.map((e) => e.name)
    const values = [...new Set(activityName)]
    console.log(values)

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getCountries());
    },[])
    useEffect(() =>{
        dispatch(getActivity());
    },[dispatch]);
console.log('hola', activities)

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

function handleFilterActivity(e){
    dispatch(filterCountryByActivity(e.target.value))
}

    return(
        <div className='container'>
        <div className='ButtonsContainer'>
        
        
        <div>
            
            <button className='HomeButton' onClick={e=>{handleClick(e)}}>LOAD ALL COUNTRIES</button>
        </div>
        
            <select className='select-css' onChange={e => handleSort(e)}>
            <option hidden selected>Filter by Alphabetical Order</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select className='select-css' onChange={e => handleSortPopulation(e)}>
            <option hidden selected>Filter by Population</option>
                <option className='option-css' value='hip'>Higher Population</option>
                <option className='option-css' value='smp'>Smaller Population</option>
            </select>
            <select className='select-css' onChange={e => handleFilterContinent(e)}>
            <option hidden selected>Filter by Continent</option>
                <option value='All'>All</option>
                <option value='Africa'>Africa</option>
                <option value='America'>America</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <div>
                    <select className='select-css' onChange={(e)=>handleFilterActivity(e)}>
                    <option hidden selected>Filter by Tourist Activity</option>
                       {values.map((el) => (
                            <option value= {el}>{el}</option>
                        ))}
                       </select>
                  </div>
                  <div>
            <Link to='/activities'><button className='HomeButton'>CREATE TOURIST ACTIVITIES</button></Link>
        </div>         
            </div>      
            <div className='paged'>      
            <Paged
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paged={paged}
                />
            <SearchBar/>
            </div>
            {currentCountries?.map((el)=>{
                return (
                    <div className='card'>
                        <Link to={'/home/' + el.id}>
                            <Card flagimg={el.flagimg} name={el.name} continent={el.continent} key={el.id}/>
                        </Link>
                    </div>
                )
            })}
        
        </div>        

    )
}