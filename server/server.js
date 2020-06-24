const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

// Use middleware to parse the form data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Optionally I can use this without body-parser to directly parse data with express
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );

// Required - Step 5
// Use custom middleware to log every req.url
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Required - Step 3
// Example: Send text to localhost with server
// app.get('/', (req, res) => {
//   res.send('Hello from the web server side...');
// });

// Example: Send a single file to localhost with server
// const indexPath = path.join(__dirname, '../public/index.html')
// app.get('/', (req, res) => {
//   res.sendFile(indexPath);
// });

// Example: Send multiple files to localhost  with server
// const clientPath = path.join(__dirname, '../public');
// app.use(express.static(clientPath))



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

// Required - Step 4
let publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Advanced - Post form to a route + Write form results/values to a JSON file (form-data.json) in directory + Display thank you message
app.post('/contact-form/:id', (req, res) => {
  // Setup JSON format
  const formValues = {
      name: `${req.body.name}`,
      email: `${req.body.email}`,
    }

  // Stringify JSON
  const formData = JSON.stringify(formValues);

  // Option 1: Write formData to form-data.json async 
  fs.writeFile('./form-data.json', formData, (err) => {
if (err) throw err;
    console.log('File created!')
  }
  );

  // Option 2: Append to formData to form-data.json async
  // fs.appendFile('./form-data.json', formData, (err) => {
  //   if (err) throw err;
  //   console.log('Appended created!');
  // });

  // Display Thank you message
  res.status(200).send(`Thanks ${req.body.name} for your submission!`);
});

app.listen('3000');
