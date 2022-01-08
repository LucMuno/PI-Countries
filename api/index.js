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
const { conn, Country } = require('./src/db.js');
const axios = require('axios');

//precargando datos de la api
const getApiInfo = async function (){
 const countriesApi = await axios.get('https://restcountries.com/v3.1/all')
 await (countriesApi.data.map(e => {
  let {cioc, name, flags, continents, capital, subregion, area, population } = e
  let data ={
          id: cioc,
          name: name.common,
          flagimg: flags.png,
          continent: continents[0].split(' ').length >1 ? continents[0].split(' ')[1]: continents[0],
          capital: capital ? capital[0] : 'No Capital Found',
          subregion: subregion ? subregion : 'No Subregion Found',
          area: Math.round(area),
          population: population,
  }
  Country.findOrCreate({where: data})
  .catch(error => error)
 }))
}


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  getApiInfo()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

