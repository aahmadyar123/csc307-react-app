const express = require('express'); //import express
const app = express();              //create instane of express
const port = 8000;                  //port number

//allows express to process incoming data in JSON format
app.use(express.json());


//user data
const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}


//get response for / path
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//get response for /users path
app.get('/users', (req, res) => {
    res.send(users);
});


//listen on port 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});