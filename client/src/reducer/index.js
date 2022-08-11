const initialState = {
    countries : [],
    allCountries: [],
    activity: [],
    detail: [],
    cams: [],
    countryCams: []
    
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
        }
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries    
            var continentFiltered = []
            if(action.payload === 'All'){
                continentFiltered = allCountries
            }else{
                continentFiltered = allCountries.filter(el => el.continent === action.payload)
            }
            return{
                ...state,
                countries: continentFiltered
        }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                countries: sortedArr 
            }
            case 'ORDER_BY_POPULATION':
                let sortedArr2 = action.payload === 'hip' ?
                    state.countries.sort(function(a,b){
                        if(a.population > b.population){
                            return -1;
                        }
                        if(b.population > a.population){
                            return 1;
                        }
                        return 0;
                    }) :
                    state.countries.sort(function(a,b){
                        if(a.population > b.population){
                            return 1;
                        }
                        if(b.population > a.population){
                            return -1;
                        }
                        return 0;
                    })
                return{
                    ...state,
                    countries: sortedArr2 
                }  
            case 'GET_NAME_COUNTRIES':
                return {
                    ...state,
                    countries: action.payload
                }   
            case 'POST_TOURIST_ACTIVITY':
                return {
                    ...state
                }  
            case 'GET_ACTIVITY':
                return{
                   ...state,
                   activities : action.payload
                };  
            case 'FILTER_BY_ACTIVITY':
                const array = []
            state.allCountries.map(el => el.Activities?.forEach(element => {
                console.log(el.Activities)
             if (element.name === action.payload) {
                array.push(el)
                };
            }));
            const array2 =  [...new Set(array)]
            console.log("new array", array2)
            return{
                ...state,
                countries: array2
            };
            
            case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload
            };
            case 'GET_CAMS':
            return {
                ...state,
                cams: action.payload,
            }
            case 'GET_COUNTRY_CAMS':
            return {
                ...state,
                countryCams: action.payload
            }    
        default:
        return state;
    }

}


export default rootReducer;