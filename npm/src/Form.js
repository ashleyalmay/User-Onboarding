import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";



const formSchema = yup.object().shape({
    name: yup.string().required("Need a name"),
    password: yup.string().required("Need a password"),
    email: yup.string().email("Need an email").required("Need an email"),
    terms:yup.boolean().oneOf([true], "Please agree to the terms of use"),
});

const Form = props => {
 const [disable, setDisable] = useState(false);  
const [box, setBox] = useState({
    name: '',
    password: '',
    email: '',
    terms: '',
});

const[error, setError] = useState({
    name: '',
    password: '',
    email: '',
    terms: '',

});

const [post, setPost] = useState([])

 useEffect(() => {
         formSchema.isValid(box)
   .then(pressed => {
       setDisable(!pressed);
 })
 },[box])

const validateChange = event => {
    yup.reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(pressed => {
        setError({
            ...error,[event.target.name] : ""
        });
    })
    .catch(err => {
        setError({
            ...error, [event.target.name] : err.errors[0]
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
 validateChange(event);
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

    <label htmlFor="name">Name: {error.name.length > 3 ? <p className="error">{error.name}</p> : null} </label>
        <input 
            id="name" 
            type="text" 
            name="name" 
            onChange={inputChange}
            placeholder="name"
            value={box.name} required/>
             
    <label htmlFor="password">Password: {error.password.length > 0 ? (<p className="error">{error.password}</p>) : null} </label>
        <input id="password" 
            type="password" 
            name="password" 
            onChange={inputChange}
            placeholder="password"
            value={box.password} required/>
       
    <label htmlFor="email">Email: {error.email.length > 0 ? (
    <p className="error">{error.email}</p>) : null}</label>
        <input id="email" 
            type="text" 
            name="email" 
            onChange={inputChange}
            placeholder="email"
            value={box.email} required/>
        
    <label htmlFor="terms" className="terms">    
        <input
        type = "checkbox"
        name="terms"
        onChange={inputChange}
        checked={box.terms} />
        Terms & Conditions
        </label>

         <pre>{JSON.stringify(post, null, 2)}</pre> 
        <button disabled={disable} type="submit">Submit</button>

    </form>
            {props.notes.map(note =>(
                    <div className="note" key={note.id}>
                        {/* <h2>Name: {note.name}</h2>
                        <h2>Password: {note.password}</h2>
                        <h2>Email: {note.email}</h2> */}
                    </div>
                ))} 
                </div>
    );
}

export default Form;