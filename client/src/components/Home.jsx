import style from './styles/Home.module.css'
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries,filterCountriesByContinent,getActivity,orderByName,orderByPopulation,filterCountryByActivity, getCountryCam } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import SearchBar from './SearchBar';
import PuffLoader from "react-spinners/PuffLoader";
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import './styles/Pagination.css'
//import Navbar from './NavBar';



export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [pageNumber, setPageNumber] = useState(0)
    const countriesPerPage = 10
    const pagesVisited = pageNumber * countriesPerPage
    const displayCountries = allCountries.slice(pagesVisited, pagesVisited + countriesPerPage)
       
    const activities = useSelector((state) => state.activities)
    const allCountriesCams = useSelector((state) => state.countryCams)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const pageCount = Math.ceil(allCountries.length / countriesPerPage)
    const activityName = activities?.map((e) => e.name)
    const values = [...new Set(activityName)]
    const navRef = useRef();
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }
    const showNavBar = () => {
        navRef.current.classList.toggle(style["responsive_nav"])
    }
    //console.log("Cameras", allCountriesCams)
    const override = {
        display: "block",
        margin: "0 auto",
    };
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        },1500)
    },[])
    useEffect(() => {
        dispatch(getCountryCam());
    },[])
    
    useEffect(() => {
        dispatch(getCountries());
    },[])
    useEffect(() =>{
        dispatch(getActivity());
    },[dispatch]);

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
        <div className={style.home}>
            <header className={style.header}>
            <nav className={style.navBar} ref={navRef}>
                <a><GiEarthAmerica size={30}/></a> 
                <a className={style.select} href='/home/'>Home</a>
                <select className={style.select} onChange={e => handleSortPopulation(e)}>
            <option hidden selected>Filter by Population</option>
                <option className={style.Option} value='hip'>Higher Population</option>
                <option className={style.Option} value='smp'>Smaller Population</option>
            </select>
            <a>
            <select className={style.select} onChange={e => handleSort(e)}>
            <option hidden selected>Filter by Alphabetical Order</option>
                <option className={style.Option} value='asc'>A-Z</option>
                <option className={style.Option} value='desc'>Z-A</option>
            </select>
            </a>
            <a>
            <select className={style.select} onChange={e => handleFilterContinent(e)}>
            <option hidden selected>Filter by Continent</option>
                <option className={style.Option} value='All'>All</option>
                <option className={style.Option} value='Africa'>Africa</option>
                <option className={style.Option} value='America'>America</option>
                <option className={style.Option} value='Asia'>Asia</option>
                <option className={style.Option} value='Europe'>Europe</option>
                <option className={style.Option} value='Oceania'>Oceania</option>
            </select>
            </a>
            <a className={classnames(style.navBtn, style.navCloseBtn)} onClick={showNavBar}><FaTimes/></a>    
            </nav>
            <button className={style.navBtn} onClick={showNavBar}><FaBars/></button>
            <SearchBar setCountries={allCountries}/>
            </header> 
        {/*<nav className={style.navbar}>
        
        
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
                       </nav>   */}
               
          
            
            
                {
                    loading ?
                    <PuffLoader
                    color={"#ffffff"} loading={loading} cssOverride={override} size={300} />
                    :
            <div className={style.container}>
            {displayCountries?.map((el)=>{
                return (
                    <div>
                        <Link to={'/home/' + el.id} style={{textDecoration:"none", color:"black"}}>
                            <Card flagimg={el.flagimg} name={el.name} continent={el.continent} key={el.id}/>
                        </Link>
                    </div>
                )
            })}
             
            </div>
            }
            <div>
            <ReactPaginate
                previousLabel={"< Previous"}
                nextLabel={"Next >"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            </div>
        </div>        

    )
     
}