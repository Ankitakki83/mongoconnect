const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
app.use(express.json());

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, 
useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



  const port = 5000;app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));

  const Animal = require('./models/Animal');
  
//   const newAnimal = new Animal({
//     name: 'Red Panda',
//     isEndangered: true
//   })

//   const newAnimal = new Animal({
//     name: 'Python',
//     isEndangered: true
//   })
//   const newAnimal = new Animal({
//     name: 'Mamba',
//     isEndangered: false
//   })
//   const newAnimal = new Animal({
//     name: 'wild cat',
//     isEndangered: true
//   })
//   newAnimal
//     .save()
//     .then(item => console.log(item))
//     .catch(err => console.log(err));



// Animal
//   .findOneAndUpdate(
//     { _id: '5d1c56112e477b1a45f67601' },
//     { isEndangered: false }
//   )
//   .then(item => console.log(item));

// Animal
//   .findOneAndDelete(
//     { _id: '5d1c57198cc7261aac35031c' },
//     { isEndangered: true }
//   )
//   .then(console.log('Item deleted'));

// Read all entries
app.get('/', (req, res) => {
    Animal.find()
      .sort({ date: -1 })
      .then(items => console.log(res.json(items)));
  });
  
  // Add a new entry
  app.post('/', (req, res) => {
    const newAnimal = new Animal({
      name: req.body.name,
      isEndangered: req.body.isEndangered || false,
    });
    newAnimal
      .save()
      .then(item => res.json(item));
  });

  // Delete an entry
  app.delete('/:id', (req, res) => {
    Animal.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });
  
  // Update an entry
  app.put('/:id', (req, res) => {
    Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });
  
//   const port = 5000;
//   app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));