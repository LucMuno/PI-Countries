import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import './styles/Detail.css'
import './styles/Home.css'

export default function Detail(props) {
    const dispatch =  useDispatch();
console.log('prueba', props)
useEffect(()=>{
    dispatch(getDetail(props.match.params.id)); 
},[dispatch, props.match.params.id]);

const Country = useSelector((state)=> state.detail); 
console.log(Country.Activities, 'hola');

function selectDifficulty(value){
    switch (value) {
        case '1':
            return 'Level 1 Low Difficulty';
        case '2':
            return 'Level 2 Medium Difficulty';
        case '3':
            return 'Level 3 Medium Difficulty';
        case '4':
            return 'Level 4 High Difficulty';
        case '5':
            return 'Level 5 High Difficulty';
        default:
           console.log('No difficulty'); 
    }
}
function selectDuration(value){
    switch (value) {
        case '1':
            return '1 to 3 hours';
        case '2':
            return '3 to 6 hours';
        case '3':
            return '6 to 9 hours';
        case '4':
            return '9 to 12 hours';
        case '5':
            return 'More than 12 hours';
        default:
           console.log('No duration'); 
    }
}

return(
    <>
     <div> 
        <Link to='/home'><button className="btnAdmin">BACK TO HOME</button></Link>
    </div>
    <div className="DetailComp">
    <div className="Detail">
        {
            Country.Activities?
            <div className="Detail">
            <h1>{Country.name}</h1>
            <img src = {Country.flagimg} alt='Image no found' width='250px' height='175px' margin='3px'/>
            <h2 className="Data">ID: {Country.id}</h2>
            <h2 className="Data">Continent: {Country.continent}</h2>
            <h3 className="Data" alt='Capital not found'>Capital: {Country.capital}</h3>
            <h4 className="Data" alt='Subregion not found'>Subregion: {Country.subregion}</h4>
            <h5 className="Data">Area: {Country.area} km²</h5>
            <h5 className="Data">Population: {Country.population} inhabitants</h5>

        {
            
        Country?.Activities === undefined || Country?.Activities?.length === 0 ? <div>
                <h3>THERE IS NOT TOURIST ACTIVITY FOR THIS COUNTRY</h3>
                <div>
                <Link to = '/activities'>
                    <button>Create Tourist Activities</button>
                </Link>
                </div>
                </div> : 
                
                Country?.Activities.map((activity) => (
                <div className='DetailTA'>
                        <h4>Tourist Activity: {activity.name} </h4>
                        <h4>Difficulty: {selectDifficulty(activity.difficulty)} </h4>
                        <h4>Season: {activity.season} </h4>
                        <h4>Duration: {selectDuration(activity.duration)}</h4>
                </div>
                ))
                
                }

            </div> : <p>Details not found</p>
        }
    </div> 
    </div>
    </>
)
}




