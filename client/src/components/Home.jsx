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
        <div>
        <nav className='navbar'>
        
        
        <div>
            
            <button className='btnAdmin' onClick={e=>{handleClick(e)}}>LOAD ALL COUNTRIES</button>
        </div>
            <div>
            <select className='btnAdmin' onChange={e => handleSort(e)}>
            <option hidden selected>Filter by Alphabetical Order</option>
                <option className='Option' value='asc'>A-Z</option>
                <option className='Option' value='desc'>Z-A</option>
            </select>
            </div>
            <div>
            <select className='btnAdmin' onChange={e => handleSortPopulation(e)}>
            <option hidden selected>Filter by Population</option>
                <option className='Option' value='hip'>Higher Population</option>
                <option className='Option' value='smp'>Smaller Population</option>
            </select>
            </div>
            <div>
            <select className='btnAdmin' onChange={e => handleFilterContinent(e)}>
            <option hidden selected>Filter by Continent</option>
                <option className='Option' value='All'>All</option>
                <option className='Option' value='Africa'>Africa</option>
                <option className='Option' value='America'>America</option>
                <option className='Option' value='Asia'>Asia</option>
                <option className='Option' value='Europe'>Europe</option>
                <option className='Option' value='Oceania'>Oceania</option>
            </select>
            </div>
            
            <div>
                    <select className='btnAdmin' onChange={(e)=>handleFilterActivity(e)}>
                    <option hidden selected>Filter by Tourist Activity</option>
                       {values.map((el) => (
                            <option className='Option' value= {el}>{el}</option>
                        ))}
                       </select>
                  </div>
                  <div>
            <Link to='/activities'><button className='btnAdmin'>CREATE TOURIST ACTIVITIES</button></Link>
        </div>         
            </nav>      
            <div className='paged'>      
            <Paged
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paged={paged}
                />
            </div>
            <SearchBar/>
            
            <div className='container'>
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
        </div>        

    )
}