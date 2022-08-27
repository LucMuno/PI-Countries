//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country, CountryCam } = require('./src/db.js');
const axios = require('axios');
const apikey = 'NRMOYsLnu0CvCF2LyEWluP40Tpiz9K4l';

//precargando datos de la api
const getApiInfo = async function (){
 const countriesApi = await axios.get('https://restcountries.com/v3.1/all')
 
 await (countriesApi.data.map(e => {
  let {cioc, name, flags, continents, capital, subregion, area, population, currencies, languages, borders, maps } = e
  //console.log("data", e)
  let data ={
          id: cioc,
          name: name.common,
          flagimg: flags.png,
          continent: continents[0].split(' ').length >1 ? continents[0].split(' ')[1]: continents[0],
          capital: capital ? capital[0] : 'No Capital Found',
          subregion: subregion ? subregion : 'No Subregion Found',
          area: Math.round(area),
          population: population,
          currencies: currencies ? currencies : 'No currencies Found',
          languages: languages ? languages : 'No languages Found',
          borders: borders ? borders : ['Country without borders'],
          maps: maps? maps.googleMaps : 'No map Found',
  }
  Country.findOrCreate({where: data})
  .catch(error => error)
 }))
}

const getCamsInfo = async function (){
  const countriesCam = await axios.get(`https://api.windy.com/api/webcams/v2/list/?key=${apikey}&show=countries`)
  //console.log("paises", countriesCam.data.result.countries)
  await (countriesCam.data.result.countries.map(e => {
   let {id, name } = e
   let data ={
           id: id,
           name: name
        }
   CountryCam.findOrCreate({where: data})
   .catch(error => error)
  }))
 }

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  getApiInfo();
  getCamsInfo();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

/*var json = await axios.get(`https://api.windy.com/api/webcams/v2/list/?key=${apikey}&show=countries`);*/