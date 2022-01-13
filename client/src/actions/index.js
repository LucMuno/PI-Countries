import axios from 'axios';

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