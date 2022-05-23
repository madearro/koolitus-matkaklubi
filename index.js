const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000;

let matkad;

const uri = "mongodb+srv://madearro:Booo0000@cluster0.osahg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const loeMatkadMallu = (async () => {
try {
  await client.connect();
  const collection = client.db("matka-app-2203").collection("treks");
  matkad = await collection.find().toArray();
  console.log(matkad);
} finally {
  await client.close();
}
})()

const naitaMatkaVaadet = async (req, res) => {
  let matk;
  try {
    await client.connect();
    const collection = client.db("matka-app-2203").collection("treks");
    matk = await collection.findOne({ _id: new ObjectId(req.params.matkaId)});
    console.log(matkad);
  } finally {
    await client.close();
    console.log(matk);
  }
  return res.render('pages/trek', { matk: matk})
}
const registreeriOsaleja = async (req, res) => {
  const paringuKeha = req.body;
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const filter = { _id: new ObjectId(paringuKeha.matkaId) };
    const updateDoc = {
      $push: { participants: paringuKeha.osaleja }
    };
    matk = await collection.updateOne(filter, updateDoc);
    res.json({ response: 'Töötas!' });
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
}

const tagastaMatkad = async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const treks = await collection.find().toArray();
    res.json(treks);
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
}

const salvestaMatk = async (req, res) => {
  const matkaId = req.params.matkaId;
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const filter = { _id: new ObjectId(matkaId) };
    const updateDoc = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      }
    };
    matk = await collection.updateOne(filter, updateDoc);
    res.json({ response: 'Töötas!' });
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
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
  const uudis = uudised.find((uudis) => uudis._id === parseInt(req.params.uudiseId))
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
