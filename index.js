const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  id: 0,
  title: 'Kepikõnd ümber Ülemiste järve',
  description: 'Algab 6. juunil Ülemiste parklast',
  startsAt: 'Algus kl 10:00 hommikul',
  endsAt: 'Lõpeb kl 14:00',
  startingLocation: 'Koguneme: Ülemiste Selveri parklas',
  locationLatitude: '59.393345',
  locationLongitude: '24.722974',
  price: 'Hind 15€',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqSLCDS-f2ue1SPozxT8anx56fnQsD12M3A&usqp=CAU',
  participants: [],
};

const matk2 = {
  id: 1,
  title: 'Kõnd',
  description: 'Algab 7. juunil Magistrali parklast',
  startsAt: 'Algus kl 11:00 hommikul',
  endsAt: 'Lõpeb kl 15:00',
  startingLocation: 'Koguneme: Magistrali parklas',
  locationLatitude: '59.393345',
  locationLongitude: '24.722974',
  price: 'Hind 20€',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTue-f7qyQ0pIXq4-yFCu5uzwWvlkVelEhNsQ&usqp=CAU',
  participants: [],
  
};

const matk3 = {
  id: 2,
  title: 'Ujumine üle Suure väina',
  description: 'Algab 10. juunil Virtsu sadamast',
  startsAt: 'Algus kl 12:00',
  endsAt: 'Lõpeb kl 15:00',
  startingLocation: 'Koguneme: Järve Selveri parklas',
  locationLatitude: '59.393345',
  locationLongitude: '24.722974',
  price: 'Hind 10€',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpln62CJtOWmHsudPcwY_qXdgTz9QHoyRpg&usqp=CAU',
  participants: [],
};

const matkad = [matk1, matk2, matk3];
const naitaMatkaVaadet = (req, res) => {
  console.log(req.params.matkaId);
  const matk = matkad.find((matk) => matk.id === parseInt(req.params.matkaId))
  return res.render('pages/trek', { matk: matk})
}
const registreeriOsaleja = (req, res) => {
  const paringuKeha = req.body;
  const matk = matkad.find((matk) => matk.id === parseInt(paringuKeha.matkaId));
  matk.participants.push(paringuKeha.osaleja);
  console.log(JSON.stringify(matkad));
  res.json({ response: 'Töötas!' });
}

const tagastaMatkad = (req, res) => {
  res.json(matkad);
}

const salvestaMatk = (req, res) => {
  const matkaId = req.params.matkaId;
  let matk = matkad.find((matk) => matk.id === parseInt(matkaId));
  matk.title = req.body.title;
  matk.description = req.body.description;
  matk.imageUrl = req.body.imageUrl;
  res.json({ response: 'Töötas!' });
}

const uudis1 = {
  id: 0,
  title: 'Hoiatus: ära mine Cinque Terres plätudega matkama',
  description: 'Alates 2019.a. ei kuulu plätudega matkama minek enam algajate poolt tehtavate vigade hulka, vaid....',
  longdecription: `Itaalias Liguurua rannikul asuv Cinque Terre on turistide hulgas õigustatult populaarne – kaljude otsas
  asuvad pastellvärvides külad ja sinine meri. UNESCO maailmapärandi nimekirja kantud Cinque Terre külad ja nende
  ümbrus on ka populaarne matkamispaik. Kuid Cinque Terre rahvuspargis matkamisega tasub teada ka seal kehtivat
  korda. Alates 2019. aastast ei kuulu plätudega matkama minek enam algajate poolt tehtavate vigade hulka, vaid
  plätud, sandaalid ja teised lahtised jalanõud on rahvuspargis matkama minekul keelatud. Kanda tuleb suletud,
  veekindlaid ja mittelibisevaid jalanõusid. Reeglite ignoreerimine pole kõige odavam lõbu. Trahvid ulatuvad 50 eurost
  kuni 2500 euroni.`,
  link: `https://trip.ee/uudised/hoiatus-aera-mine-cinque-terres-plaetudega-matkama`,
};

const uudis2 = {
  id: 1,
  title: 'Soovitus - ära roni Rooma kuulsatesse purskkaevudesse!',
  description: `Itaalia meediast on viimasel ajal läbi käinud läbi juhtumid, kus turistid on ennast jahutanud või
  pildistanud Piazza Navona, Piazza Barberini või Trevi kuulsates purskkaevudes. Paljud ilmselt ei tea, etalates 2018. aastast toob see kaasa trahvi, mis varieerub 160 eurost kuni 450 euroni`,
  longdecription: `Itaalia meediast on viimasel ajal läbi käinud läbi juhtumid, kus turistid on ennast jahutanud või
  pildistanud Piazza Navona, Piazza Barberini või Trevi kuulsates purskkaevudes. Paljud ilmselt ei tea, et
  sellised teod toovad alates 2018. aastast kaasa trahvi, mis varieerub 160 eurost kuni 450 euroni – kui
  maksta kohe. Hiljem makstes on trahvid veelgi suuremad. Lisaks sellele on politseil õigus keelata
  sanktsioneeritud inimestel sisenemast teatavatesse Rooma piirkondadesse 48 tunniks või kuni 60 päevaks`,
  link: 'https://trip.ee/uudised/soovitus-aera-roni-rooma-kuulsatesse-purskkaevudesse',
};

const uudis3 = {
  id: 2,
  title: 'Tšehhis avatakse maailma pikim rippsild',
  description: `Nagu silla nimest Sky
  Bridge 721 võib aru saada, on sild 721 meetrit pikk. Selle ehitus võttis aega 2 aastat. Dolní Morava
  kodulehel on kirjas, et maapinnast 95 meetri kõrgusel asuva ja kõigest 1,2 meetri laiuse silla ületamine
  nõuab "mõnevõrra julgust", aga elamus peaks selle eest olema vääriline`,
  longdecription: `Tšehhis suusakuurortis Dolní Moravas avatakse 22. mail 2022 maailma pikim rippsild. Nagu silla nimest Sky
  Bridge 721 võib aru saada, on sild 721 meetrit pikk. Selle ehitus võttis aega 2 aastat. Dolní Morava
  kodulehel on kirjas, et maapinnast 95 meetri kõrgusel asuva ja kõigest 1,2 meetri laiuse silla ületamine
  nõuab "mõnevõrra julgust", aga elamus peaks selle eest olema vääriline. Rippsilla kõrgus merepinnast on
  silla ühes otsas 1125 meetrit ja teises otsas 1135 meetrit. Dolní Morava rippsild võtab maailma pikima
  rippsilla tiitli üle 2020 aastal Portugalis, Portost 60 km kaugusel Arouca geopargis avatud 516 meetriselt
  rippsillalt.`,
  link: 'https://trip.ee/uudised/tsehhis-avatakse-maailma-pikim-721-meetrine-rippsild',
};

const uudised = [uudis1, uudis2, uudis3];
const naitaUudiseVaadet = (req, res) => {
  console.log(req.params.uudiseId);
  const uudis = uudised.find((uudis) => uudis.id === parseInt(req.params.uudiseId))
  console.log(uudis)
  return res.render('pages/new', { uudis: uudis })
}

express()
.use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/treks/:matkaId', naitaMatkaVaadet)
  .get('/treks', (req, res) => res.render('pages/treks', { matkad: matkad}))
  .get('/news/:uudiseId', naitaUudiseVaadet)
  .get('/news', (req, res) => res.render('pages/news', { uudised: uudised}))
  .get('/admin', (req, res) => res.render('pages/admin'))
  .post('/api/register', registreeriOsaleja)
  .get('/api/treks', tagastaMatkad)
  .post('/api/treks/:matkaId', salvestaMatk)
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
