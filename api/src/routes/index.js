const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Country, TouristActivity} = require('../db.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
    const name = req.query.name;
    let allCountries = await Country.findAll();//getCountries(); 
    if(name){
        let countryName = await allCountries.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('Country not found');
    }else{
        
        res.status(200).send(allCountries)
    }
});

router.post('/activity', async (req, res) => {
    let { name, difficulty, duration, season } = req.body
    let data = {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    }
    console.log(data)
    await TouristActivity.findOrCreate({where: data})
    .catch(error => error)
    res.status(200).send('Successful tourist activity created')
})

router.get('/countries/:id', async (req, res) => {
    const id = req.params.id.toUpperCase();
    const countryId = await Country.findByPk(id);
        if(countryId){
            return res.send(countryId)
        }else{
           res.status(404).send('Country not found')

        }    
        
        
    
})
module.exports = router;
