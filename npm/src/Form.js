import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";



const formSchema = yup.object().shape({
    Name: yup.string().required("Need a name"),
    Password: yup.string().required("Need a password"),
    Email: yup.string().email("Need an email").required("Need an email"),
    Terms:yup.boolean().oneOf([true], "Please agree to the terms of use"),
});

const Form = props => {
const [disable, setDisable] = useState(true);  
const [box, setBox] = useState({
    name: '',
    Password: '',
    Email: '',
    Terms: '',
});

const[error, setError] = useState({
    name: '',
    Password: '',
    Email: '',
    Terms: ''

});

const [post, setPost] = useState([])

useEffect(() => {
   formSchema.isValid(box)
   .then(pressed => {
       setDisable(!pressed);
})
},[box])

const validateChange = event => {
    yup.reach(formSchema, event.target.Name)
    .validate(event.target.valid)
    .then(pressed => {
        setError({
            ...error,[event.target.Name] : ""
        });
    })
    .catch(err => {
        setError({
            ...err, [event.target.Name] : err.error[0]
        });
    })
};

const inputChange = event =>{
    event.persist();
        const newFormData = {
            ...box, [event.target.name] : 
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
    setBox(newFormData);
    // validateChange(event);
};
const submitForm = event => {
        event.preventDefault();
        axios
              .post("https://reqres.in/api/users", box)
              .then(res => {
                setPost(res.data); 
                console.log("success", post);
            
                setBox({
                  name: "",
                  email: "",
                  terms: "",
                  password: "",
                });
              })
              .catch(err => console.log(err.response));
    
}

    return( 
<div className="note-list">           
<form onSubmit={submitForm}>

    <label htmlFor="name">Name:{error.name.length > 0 ? <p className="error">{error.name}</p> : null} </label>
        <input 
            id="name" 
            type="text" 
            name="name" 
            onChange={inputChange}
            placeholder="Name"
            value={Form.Name} required/>
             
    <label htmlFor="Password">Password:{error.Password.length > 0 ? (<p className="error">{error.Password}</p>) : null} </label>
        <input id="Password" 
            type="password" 
            name="Password" 
            onChange={inputChange}
            placeholder="Password"
            value={box.Password} required/>
       
    <label htmlFor="Email">Email:{error.Email.length > 0 ? (
    <p className="error">{error.Email}</p>) : null}</label>
        <input id="Email" 
            type="text" 
            name="Email" 
            onChange={inputChange}
            placeholder="Email"
            value={box.Email} required/>
        
    <label htmlFor="Terms" className="terms">    
        <input
        type = "checkbox"
        name="terms"
        onChange={inputChange}
        checked={box.Terms} />
        Terms & Conditions
        </label>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={disable} type="submit">Submit</button>

    </form>
            {props.notes.map(note =>(
                    <div className="note" key={note.id}>
                        <h2>Name: {note.Name}</h2>
                        <h2>Password: {note.Password}</h2>
                        <h2>Email: {note.Email}</h2>
                    </div>
                ))} 
                </div>
    );
}

export default Form;