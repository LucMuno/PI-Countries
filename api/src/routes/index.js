const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Country, Activity, CountryCam} = require('../db.js');
const { Op } = require('sequelize');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res, next) =>{
    let Name = req.query.name
        if (Name) {    
            try{
                let paQuery = await Country.findAll({
                    include: Activity,
                    where:{
                        name:{
                            [Op.iLike]: '%' + Name + '%'}}})
                if (!paQuery.length) {
                    return res.status(404).json('Country not found')
                }else{
                    return res.json(paQuery)
                }
            }
            catch(error){
                next(error);
            }
        }
    try{
        const paisesBd = await Country.findAll({
            include: {model: Activity}
        })
        return res.json(paisesBd)
    }
    catch(error){
        next(error);
    }
    })
    
    router.get('/countries/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        var ap = await Country.findByPk(id,{
        include: Activity,
        })
        return res.send(ap)
        }
       
    catch(error){
        next(error)
    }
    console.log("detalle",ap)
    })

router.post('/activities', async (req, res, next) => {
    const {name,difficulty,duration,season,countryId} = req.body
    try {
        if(name && difficulty && duration && season){
            let activityCreated = await Activity.create({
                    name,
                    difficulty ,
                    duration ,
                    season,
                })
    try {
        let country = await Country.findAll({
            where:{
                id : countryId
            }})
            await activityCreated.addCountries(country)
            res.send(country)
    }
    catch (error) {
            next(error)
        }
    }
    else{
        res.status(404).send("Error entry inputs are wrong")
        }
    }
    catch (error) {
        next(error)
        }
    });

    router.get('/activities', async (req, res) => {
        const name = req.query.name;
        let allActivities = await Activity.findAll();
        if(name){
            let countryName = await allActivities.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('Country not found');
        }else{
            
            res.status(200).send(allActivities)
        }
    });

    /*router.get('/countryCam', async (req, res) => {
        const name = req.query.name;
        let allCountriesCam = await CountryCam.findAll();
        if(name){
            let countryName = await allCountriesCam.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('Country not found');
        }else{
            res.status(404).send('Country not found');
            //res.status(200).send(allActivities)
        }
    });*/

    router.get('/countryCam', async (req, res) =>{
        const country = await CountryCam.findAll();
        //console.log("name", country)
        if (country === null) {
            console.log('Not found!');
        } else {
            return res.json(country)
        }    
       
    })
    
    /*router.get('/countryCam', async (req, res, next) =>{
        let name = req.query.name
            if (name) {    
                try{
                    let paQuery = await CountryCam.findOne({
                        where:{
                            name: name 
                        }})    
                    if (!paQuery.length) {
                        return res.status(404).json('Country not found')
                    }else{
                        return res.json(paQuery)
                    }
                }
                catch(error){
                    next(error);
                }
            }
       
        })*/
module.exports = router;
