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

express()
.use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/treks/:matkaId', naitaMatkaVaadet)
  .get('/treks', (req, res) => res.render('pages/treks', { matkad: matkad}))
  .get('/news', (req, res) => res.render('pages/news'))
  .post('/api/register', registreeriOsaleja)
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
