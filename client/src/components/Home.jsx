import style from './styles/Home.module.css'
import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries,filterCountriesByContinent,getActivity,orderByName,orderByPopulation,filterCountryByActivity, getCountryCam } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paged from './Paged';
import SearchBar from './SearchBar';



export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const allCountriesCams = useSelector((state) => state.countryCams)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry =  currentPage * countriesPerPage 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const activityName = activities?.map((e) => e.name)
    const values = [...new Set(activityName)]
    //console.log("Cameras", allCountriesCams)

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountryCam());
    },[])
    
    useEffect(() => {
        dispatch(getCountries());
    },[])
    useEffect(() =>{
        dispatch(getActivity());
    },[dispatch]);
//console.log('hola', activities)

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

if(!allCountries){
    return <h1>LOADING...</h1>
  }else{
    return(
        <div className={style.home}>
        
        <nav className={style.navbar}>
        
        
        <div>
            
            <button className={style.btnAdmin} onClick={e=>{handleClick(e)}}>LOAD ALL COUNTRIES</button>
        </div>
            <div>
            <select className={style.btnAdmin} onChange={e => handleSort(e)}>
            <option hidden selected>Filter by Alphabetical Order</option>
                <option className={style.Option} value='asc'>A-Z</option>
                <option className={style.Option} value='desc'>Z-A</option>
            </select>
            </div>
            <div>
            <select className={style.btnAdmin} onChange={e => handleSortPopulation(e)}>
            <option hidden selected>Filter by Population</option>
                <option className={style.Option} value='hip'>Higher Population</option>
                <option className={style.Option} value='smp'>Smaller Population</option>
            </select>
            </div>
            <div>
            <select className={style.btnAdmin} onChange={e => handleFilterContinent(e)}>
            <option hidden selected>Filter by Continent</option>
                <option className={style.Option} value='All'>All</option>
                <option className={style.Option} value='Africa'>Africa</option>
                <option className={style.Option} value='America'>America</option>
                <option className={style.Option} value='Asia'>Asia</option>
                <option className={style.Option} value='Europe'>Europe</option>
                <option className={style.Option} value='Oceania'>Oceania</option>
            </select>
            </div>
            
            <div>
                    <select className={style.btnAdmin} onChange={(e)=>handleFilterActivity(e)}>
                    <option hidden selected>Filter by Tourist Activity</option>
                       {values.map((el) => (
                            <option className={style.Option} value= {el}>{el}</option>
                        ))}
                       </select>
                  </div>
                  <div>
            <Link to='/activities'><button className={style.btnAdmin}>CREATE TOURIST ACTIVITIES</button></Link>
        </div>         
            </nav>      
            <div>      
            <Paged
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paged={paged}
                />
            </div>
            <SearchBar/>
            
            <div className={style.container}>
            {currentCountries?.map((el)=>{
                return (
                    <div>
                        <Link to={'/home/' + el.id} style={{textDecoration:"none", color:"black"}}>
                            <Card flagimg={el.flagimg} name={el.name} continent={el.continent} key={el.id}/>
                        </Link>
                    </div>
                )
            })}
            </div>
          
        </div>        
    )
   }  
}