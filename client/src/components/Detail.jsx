import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getCams } from "../actions";
import { useEffect, useState } from "react";
import style from './styles/Detail.module.css';
import PuffLoader from "react-spinners/PuffLoader";
//import style from './styles/Home.module.css'

export default function Detail(props) {
const dispatch =  useDispatch();
const countrywithcam = useSelector((state) => state.countryCams)
const Country = useSelector((state)=> state.detail); 
const Cameras = useSelector((state)=> state.cams);
const [loading, setLoading] = useState(false);
const override = {
    display: "block",
    margin: "0 auto",
};
var country = ""
countrywithcam.map((e) => {
    //console.log(e.name,Country.name)
    if(e.name === Country.name){
      country = e.id
    }});
console.log('prueba', props)
useEffect(()=>{
    dispatch(getDetail(props.match.params.id)); 
    if(country){
    dispatch(getCams(country));
    }
    
},[country]);
useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    },1500)
},[])
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
    <div className={style.DetailComp}>
    {/*<div className={styleD.Detail}>*/}
     <div> 
        <Link to='/home'><button className={style.btnAdmin}>BACK TO HOME</button></Link>
    </div>
        
            
            <div className={style.Detail}>
             <div>   
            <img src = {Country.flagimg} alt='Image no found' width='400px' height='250px' margin='3px'/>
            </div>
            <div className={style.DataContainer}>
            <h1 className={style.Data}>{Country.name}</h1>
            
            <h3 className={style.Data}>Continent: {Country.continent}</h3>
            <h3 className={style.Data} alt='Capital not found'>Capital: {Country.capital}</h3>
            <h4 className={style.Data} alt='Subregion not found'>Subregion: {Country.subregion}</h4>
            <h4 className={style.Data}>Area: {Country.area} km²</h4>
            <h4 className={style.Data}>Population: {Country.population} inhabitants</h4>
            </div>
            </div>
            {
                    loading ?
                    <PuffLoader
                    color={"#ffffff"} loading={loading} cssOverride={override} size={300} />
                    :
            <div className={style.ImgContainer}>
            {
                Cameras?.map((cam)=>(
                    <div className={style.Card}>
                <div className={style.ImageContainer}>        
                <img src = {cam.image.daylight.preview} alt='Image no found' /> 
                </div>
                <div className={style.TextContainer}>
                <h5 className={style.Data}>{cam.title}</h5>
                </div>
            </div>
                ))
            }
            </div>

            }
       {/*} {    
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
                
                

              
            }*/}
    </div> 
    {/*</div>*/}
    </>
)
}




