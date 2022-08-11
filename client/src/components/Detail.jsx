import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getCams } from "../actions";
import { useEffect } from "react";
import styleD from './styles/Detail.module.css'
import style from './styles/Home.module.css'

export default function Detail(props) {
const dispatch =  useDispatch();
const countrywithcam = useSelector((state) => state.countryCams)
const Country = useSelector((state)=> state.detail); 
const Cameras = useSelector((state)=> state.cams)
var country = ""
countrywithcam.map((e) => {
    //console.log(e.name,Country.name)
    if(e.name == Country.name){
      country = e.id
    }});
console.log('prueba', props)
useEffect(()=>{
    dispatch(getDetail(props.match.params.id)); 
    if(country){
    dispatch(getCams(country));
    }
},[country]);

console.log("cameras", Cameras)
//console.log(Country.Activities, 'hola');

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
        <Link to='/home'><button className={style.btnAdmin}>BACK TO HOME</button></Link>
    </div>
    <div className={styleD.DetailComp}>
    {/*<div className={styleD.Detail}>*/}
        
            
            <div className={styleD.Detail}>
            <h1>{Country.name}</h1>
            <img src = {Country.flagimg} alt='Image no found' width='250px' height='175px' margin='3px'/>
            <h2 className={styleD.Data}>ID: {Country.id}</h2>
            <h2 className={styleD.Data}>Continent: {Country.continent}</h2>
            <h3 className={styleD.Data} alt='Capital not found'>Capital: {Country.capital}</h3>
            <h4 className={styleD.Data} alt='Subregion not found'>Subregion: {Country.subregion}</h4>
            <h5 className={styleD.Data}>Area: {Country.area} km²</h5>
            <h5 className={styleD.Data}>Population: {Country.population} inhabitants</h5>
            </div>
            {
                Cameras?.map((cam)=>(
                    <div className={styleD.card}>
                <img src = {cam.image.daylight.preview} alt='Image no found' width='250px' height='175px' margin='3px'/> 
                <h4 className={styleD.Data}>{cam.title}</h4>
            </div>
                ))
            }
            

        
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
                <div className={styleD.DetailTA}>
                        <h4>Tourist Activity: {activity.name} </h4>
                        <h4>Difficulty: {selectDifficulty(activity.difficulty)} </h4>
                        <h4>Season: {activity.season} </h4>
                        <h4>Duration: {selectDuration(activity.duration)}</h4>
                </div>
                ))
                
                

              
            }
    </div> 
    {/*</div>*/}
    </>
)
}




