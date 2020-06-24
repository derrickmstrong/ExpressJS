const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

// Required - Step 3
// Example: Send text to localhost with server
// app.get('/', (req, res) => {
//   res.send('Hello from the web server side...');
// });

// Example: Send a single file to localhost with server
// const publicPath = path.join(__dirname, '../public/index.html')
// app.get('/', (req, res) => {
//   res.sendFile(publicPath);
// });

// Example: Send multiple files to localhost  with server
// const clientPath = path.join(__dirname, '../public');
// app.use(express.static(clientPath))

// Parse the form data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Example: Post form results to the screen after submission
// app.post('/contact-form', (req, res) => {
//   console.log(req.body.name);
//   console.log(req.body.email);
//   res.send(`Thanks ${req.body.name} for your submission!`);
// });

// Example: Get/Display info from url params and query
// app.get('/contact-form/:name', (req, res) => {
//   let name = req.params.name
//   let email = req.query.email
//   res.status(200).send(`Hi ${name}, is your email ${email}?`)
// })

// Required - Step 5
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Required - Step 4
app.use(express.static(path.join(__dirname, '../public')));

// Advanced - Post form to a route + Write form results/values to a JSON file (form-data.json) in directory + Display thank you message
app.post('/contact-form/:id', (req, res) => {
  // Setup JSON object
  const formValues = [
    {
      name: `${req.body.name}`,
      email: `${req.body.email}`,
    },
  ];
  // Stringify JSON
  const formData = JSON.stringify(formValues);
  // Write formData to form-data.json
  fs.writeFileSync('./form-data.json', formData, () =>
    console.log('file create')
  );
  // Display Thank you message
  res.status(200).send(`Thanks ${req.body.name} for your submission!`);
});

app.listen('3000');
