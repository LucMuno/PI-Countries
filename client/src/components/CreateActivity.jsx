import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getCountries, postTouristActivity, getActivity} from '../actions/index';
import './styles/Activities.css'

function validate(input) {
    if(!input.name){ console.log(input.name)
        alert("A name is required");
    }else if(!input.difficulty){
        alert ("A difficulty level is required");
    }else if(!input.duration){
       alert ("Activity time duration is required");
    }else if(!input.season){
       alert ("Season election is required");
    }else if(input.countryId < 1){
       alert ("Please select countries for the tourist activity");
    }else{
        alert ("SUCCESSFUL TOURIST ACTIVITY CREATION")
    };
};
export default function CreateTouristActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [, setError] = useState({});
    const [activityName, setActivityName] = useState('')
    const [input, setInput] = useState ({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: []
    })
    
    useEffect(() =>{
        dispatch(getCountries());
    },[dispatch]);
    useEffect(() =>{
        dispatch(getActivity());
    },[dispatch]);
    
    function handleDelete(e) {
        setInput({
            ...input,
            countryId: input.countryId.filter(el => el !== e)
        });
    };
    function handleName(e){
        setInput ({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    function handleDifficulty(e){
        setInput ({
            ...input,
            difficulty: e.target.value
        })
    }
    function handleDuration(e){
        setInput ({
            ...input,
            duration: e.target.value
        })
    }
    function handleSeason(e){
        setInput ({
            ...input,
            season: e.target.value
        })
    }
    function handleCountries(e){
        setInput({
            ...input,
            countryId: [...input.countryId, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        setError (validate({
            ...input,
            [e.target.value]: e.target.value
        }));
        
        dispatch(postTouristActivity(input))
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countryId:[]
            
        });
    };
    console.log('aqui', activities)
    let sortedArr = countries.sort(function(a,b){
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        }
        return 0;
        }); 

    return(
        <div className="activityContainer">
        <div className="CreateActivity">
            <nav className="Nav">
            <div className="rightButton">
            <Link to= '/home'><button className="ButtonBackH">BACK TO HOME</button></Link>
            </div>
            <div className="leftButton">
            <Link to='/activities'><button className="ButtonCA">CREATE NEW TOURIST ACIVITY</button></Link>
            </div> 
            </nav>
            <h1>CREATE TOURIST ACTIVITIES</h1>
            <form>
                <div>
                    <label className="label">Name:</label>
                    <input placeholder='Input name' type= 'text' value= {input.name} name= 'name' onChange={(e)=>handleName(e)}/>
                </div>
                <div>
                    <label className="label">Difficulty:</label>
                    <select className="selectAct" onChange={(e)=>handleDifficulty(e)}>
                    <option hidden selected>Select Difficulty Level</option>    
                    <option value='1'>1 Low difficulty</option>
                    <option value='2'>2 Medium difficulty</option>
                    <option value='3'>3 Medium difficulty</option>
                    <option value='4'>4 High difficulty</option>
                    <option value='5'>5 High difficulty</option>
                    </select>
                </div>
                <div>
                    <label className="label">Duration Time</label>
                    <select className="selectAct" onChange={(e)=>handleDuration(e)}>
                    <option hidden selected>Select Duration</option>
                    <option value='1'>1 to 3 hours</option>
                    <option value='2'>3 to 6 hours</option>
                    <option value='3'>6 to 9 hours</option>
                    <option value='4'>9 to 12 hours</option>
                    <option value='5'>more than 12 hours</option>
                    </select>
                </div>
                <div>
                    <label className="label">Season</label>
                    <select className="selectAct" onChange={(e)=>handleSeason(e)}>
                    <option hidden selected>Select Season</option>
                    <option value='summer'>Summer</option>
                    <option value='autumn'>Autumn</option>
                    <option value='winter'>Winter</option>
                    <option value='spring'>Spring</option>
                    </select>
                </div>
                <div>
                    <label className="label">Select Country/ies</label>
                    <select className="selectAct" onChange={(e)=>handleCountries(e)}>
                       {sortedArr.map((country) => (
                            <option value= {country.id}>{country.name}</option>
                        ))}
                    </select>
                    <button className="Button" type='submit' onClick={(e) => handleSubmit(e)}>ADD TOURIST ACTIVITY !</button>
                </div>
                <div>
            {input.countryId.map(el=> 
                <div key={el.name}> 
                    <h6>{el}</h6>
                    <button onClick={()=> handleDelete(el)}>x</button>
                </div>)}
            </div>
            </form>
             
        </div>
        </div>
    )
}

