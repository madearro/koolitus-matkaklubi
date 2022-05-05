const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  title: 'Kepikõnd ümber Ülemiste järve',
  description: 'Algab 6. juunil Ülemiste parklast',
  startsAt: 'Algus 6. juuni 2022, 10:00 hommikul',
  endsAt: 'Lõpeb 6. juuni 14:00',
  startingLocation: 'Järve Selveri parkla',
  price: 'Hind 15€',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqSLCDS-f2ue1SPozxT8anx56fnQsD12M3A&usqp=CAU',
};

const matk2 = {
  title: 'Kõnd',
  description: 'Algab 7. juunil Magistrali parklast',
  startsAt: 'Algus 8. juuni 2022, 11:00 hommikul',
  endsAt: 'Lõpeb 8. juuni 15:00',
  startingLocation: 'Magistrali parkla',
  price: 'Hind 20€',
  imageUrl: '',
  
};

const matk3 = {
  title: 'Ujumine üle Suure väina',
  description: 'Koguneme sadamas',
  startsAt: 'Algus 10. juuni 2022, 12:00',
  endsAt: 'Lõpeb 10. juuni 15:00',
  startingLocation: 'Järve Selveri parkla',
  price: 'Hind 10€',
  imageUrl: 'https://spordiklubi7.ee/wp-content/uploads/2019/07/Hero-img-768x432.jpg',
};

const matkad = [matk1, matk2, matk3];

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/treks', (req, res) => res.render('pages/treks', { matkad: matkad}))
  .get('/news', (req, res) => res.render('pages/news'))
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
