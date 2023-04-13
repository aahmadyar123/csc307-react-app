import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
    //store data
    const [characters, setCharacters] = useState([]);

    //fetch data from backend then add to table
    useEffect(() => {
    fetchAll().then( result => {
        if (result)
            setCharacters(result);
        });
    }, [] );

    return (
    <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
    </div>
    )  

    //remove entry from data
    function removeOneCharacter (index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);
  }

    //add entry to data
    function updateList(person) { 
        makePostCall(person).then( result => {
        if (result && result.status === 201)
            setCharacters([...characters, person] );
    });
}

    async function makePostCall(person){
    try {
        const response = await axios.post('http://localhost:8000/users', person);
        return response;
    }
    catch (error) {
        console.log(error);
        return false;
    }
    }


}

async function fetchAll(){
    /*
    this functions fetches all data from the backend
    */
   try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data.users_list;     
   }
   catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
}


export default MyApp;