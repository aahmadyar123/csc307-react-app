import React, {useState} from 'react'
import Table from './Table'
import Form from './Form';


function MyApp() {
    //store data
    const [characters, setCharacters] = useState([]);

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
        setCharacters([...characters, person]);
    }

}




export default MyApp;