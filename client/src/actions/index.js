//import axios from 'axios';
const axios = require('axios');
const apikey = 'NRMOYsLnu0CvCF2LyEWluP40Tpiz9K4l';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}
export function filterCountriesByContinent(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}
export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: 'GET_NAME_COUNTRIES',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function postTouristActivity(payload){
    return async function(dispatch){
        try{
        var json = await axios.post("http://localhost:3001/activities", payload);
        return dispatch({
            type: 'POST_TOURIST_ACTIVITY',
            payload : json
        });
        }catch(error){
            console.log('aqui',error)
        }
    }
}
export function getActivity(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: 'GET_ACTIVITY',
            payload: json.data
        })
    }
}
export function filterCountryByActivity(payload) {
    console.log(payload)
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
}};
export function getDetail(id) {
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/countries/"+id)
            console.log("pais", json.data)
            return  dispatch({
                type: 'GET_DETAIL',
                payload : json.data
            });
        }catch(e){
        console.log(e);
}}};

export function getCams(country){
    console.log("pais1", typeof(country))
    var countryCam = country[0] + country[1]
    //var removed = country.splice(2, 1);
    return async function(dispatch){
        try{
            var json = await axios.get(`https://api.windy.com/api/webcams/v2/list/country=${countryCam}?key=${apikey}&show=webcams:image`);
            console.log("cams",json.data)
            var cam1 = json.data.result.webcams;
            console.log("cam1",cam1)
            /*var img1 = await axios.get(`https://api.windy.com/api/webcams/v2/list/show=webcams:${cam1}?key=${apikey}`);
            console.log("img1",img1)*/
            return dispatch({
                type: 'GET_CAMS',
                payload: cam1
            });
        }catch(e){
            console.log(e)
        }    
    }
}