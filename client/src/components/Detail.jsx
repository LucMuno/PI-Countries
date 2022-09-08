import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getCams } from "../actions";
import { useEffect, useState } from "react";
import style from './styles/Detail.module.css';
import PuffLoader from "react-spinners/PuffLoader";
import { SiGooglemaps } from 'react-icons/si'


export default function Detail(props) {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const countrywithcam = useSelector((state) => state.countryCams)
    const Country = useSelector((state) => state.detail);
    const Cameras = useSelector((state) => state.cams);
    const [loading, setLoading] = useState(false);
    console.log("detalle", Country)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

    }, [props]);
    const override = {
        display: "block",
        margin: "0 auto",
    };
    var country = ""
    countrywithcam.map((e) => {
        //console.log(e.name,Country.name)
        if (e.name === Country.name) {
            country = e.id
        }
    });
    console.log('prueba', props)
    useEffect(() => {
        dispatch(getCams(country));
    }, [country]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])
    console.log("cameras", Cameras)


    /*function selectDifficulty(value){
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
    }*/
    function setCurrencies(value) {
        var result = [];
        for (const property in value) {
            result.push(value[property].name + " -")
        }
        return result;
    }
    function setLanguages(value) {
        var result = [];
        for (const property in value) {
            result.push(value[property] + " -")
        }
        return result;
    }
    var bordersName = [];
    function setBorders(value) {
        console.log("valor", value)
        if (value != undefined) {
            for (var i = 0; i < value.length; i++) {
                allCountries.map((e) => {
                    if (e.id == value[i]) {
                        bordersName.push({ id: value[i], name: e.name })
                    }
                })
            }
            console.log("op", bordersName)
            return bordersName;
        }
    }



    console.log("borders", Country.borders)
    return (
        <>
            <div className={style.DetailComp}>


                <div className={style.HomeMaps}>
                    <Link to='/home'><button className={style.BackButton}>HOME</button></Link>
                    <button className={style.BackButton}><a href={Country.maps} style={{ textDecoration: "none", color: "aqua" }} target="_blank">
                        <h3><SiGooglemaps size={30} />Google Maps</h3>
                    </a></button>
                </div>
                

                    <div>
                        <img src={Country.flagimg} alt='Image no found' width='300px' height='200px' margin='3px' />
                    </div>
                    <div className={style.DataContainer}>
                        <h1 className={style.Data}>{Country.name}</h1>

                        <h3 className={style.Data}>Continent: <h3 className={style.Data2}> {Country.continent}</h3></h3>
                        <h3 className={style.Data} alt='Capital not found'>Capital:<h3 className={style.Data2}> {Country.capital}</h3></h3>
                        <h4 className={style.Data} alt='Subregion not found'>Subregion: <h4 className={style.Data2}> {Country.subregion}</h4></h4>
                        <h4 className={style.Data}>Area: <h4 className={style.Data2}> {Country.area} km²</h4></h4>
                        <h4 className={style.Data}>Population: <h4 className={style.Data2}> {Country.population} inhabitants</h4></h4>
                        <h4 className={style.Data}>Currencies: <h4 className={style.Data2}>{setCurrencies(Country.currencies)}</h4></h4>
                        <h4 className={style.Data}>Languages: <h4 className={style.Data2}>{setLanguages(Country.languages)}</h4></h4>


                    </div>
                    <div className={style.BordersContainer}>
                        <div>
                            <h2 className={style.Data}>Bordering Countries</h2>
                        </div>

                        <div className={style.BorderCountriesContainer}>
                            {
                                (Country.borders != "Country without borders") ?
                                    setBorders(Country.borders)?.map((country) => {
                                        return (
                                            <div>
                                                <Link to={'/home/' + country.id} style={{ textDecoration: "none", color: "black" }}>
                                                    <button className={style.BorderButton}>{country.name}</button>
                                                </Link>
                                            </div>

                                        )
                                    })


                                    : <span className={style.span}>Country without borders</span>
                            }
                        </div>
                    </div>
                
                {
                    loading ?
                        <PuffLoader
                            color={"#ffffff"} loading={loading} cssOverride={override} size={300} />
                        :
                        <div className={style.ImgContainer}>
                            {
                                Cameras?.map((cam) => (
                                    <div className={style.Card}>
                                        <div className={style.ImageContainer}>
                                            <img src={cam.image.daylight.preview} alt='Image no found' />
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




