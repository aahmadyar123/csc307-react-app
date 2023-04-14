const express = require('express'); //import express
const app = express();              //create instane of express
const port = 8000;                  //port number

//bypass browser restrictions
const cors = require('cors');
app.use(cors());

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


//GET response for / path
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//GET response for /users
app.get('/users', (req, res) => {
    //user id inputted in query (?name=...)
    const name = req.query.name;
    const job = req.query.job;

    //send back user with requested name and job
    if (name != undefined && job != undefined) {
        let result = findUserByNameJob(name, job)
        result = {users_list: result}
        res.send(result);
    }
    //send back user with requested name
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    //send bakk all users
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
};

const findUserByNameJob = (name, job) => {
    return users['users_list'].filter( (user) => user.name === name && user.job === job)
};


//GET response for user/id
app.get('/users/:id', (req, res) => {
    //user id parameter of request(parameter of JSON object)
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


//handle POST request
app.post('/users', (req, res) => {
    //assign user id and add to user list
    const user = req.body;
    let id = generateID();
    user.id = id;
    addUser(user);

    //send back response containing new user and status code
    res.status(201).send(user)
});

function addUser(user){
    users['users_list'].push(user);
}


function generateID() {
    /*
    this functions genereates a unique id for users
    Return:
        String: id string
    */
    let id = "";
    //generate random letters using ascii for first 3 chars of id
    for (let i = 0; i < 3; i++)
        id += String.fromCharCode(Math.floor(Math.random() * (26)) + 97)
    //generate random numbers for last 3 chars of idg
    for (let i = 0; i < 3; i++)
        id += Math.floor(Math.random() * 10);

    //check if unique id
    for (let i = 0; i < users.users_list.length; i++)
        //if id not unique generate new one
        if (id === users.users_list[i].id)
            return generateID();

    //return unique id 
    return id;

}


//handle DELETE request
app.delete('/users/:id', (req, res) => {
    //get id from url parameters
    const id = req.params["id"];

    //delete user by id and send back status code
    deleteUser(id);
    res.status(204).end();
});


function deleteUser(id) {
    //find user to delete
    for (let i = 0; i < users.users_list.length; i++) {
        if (users.users_list[i].id === id) {
            users.users_list.splice(i, 1);
        }
    }
}


//listen on port 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
