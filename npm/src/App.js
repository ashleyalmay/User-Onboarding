import React, {useState} from 'react';
import './App.css';
import Form from './Form';


function App() {
  const [notes, setNotes] = useState([
    {
        id: 1,
        Name: 'Raymond',
        Password: '',
        Email: 'Raymondthecat@gmail.com',
    },
  
  ]);
  
  const addNewNote = block =>{
  const newBlock ={
    id: Date.now(),
    Name: block.name,
    Password: block.Password,
    Email: block.Email
  };
  setNotes([...notes, newBlock])

}
  
  return (
    <div className="App">
      <h1>Coding Members</h1>
      <Form addNewNote={addNewNote} notes={notes}/>
      
    </div>
  );
}
export default App;





