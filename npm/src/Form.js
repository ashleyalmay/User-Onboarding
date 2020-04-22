import React, {useState, useEffect} from "react";
import * as yup from "yup";


const formSchema = yup.object().shape({
    Name: yup.string().required("Need a name"),
    Password: yup.string().required("Need a password"),
    Email: yup.string().email("Need an email").required("Need an email"),
    Terms:yup.boolean().oneOf([true], "Please agree to the terms of use"),
});

const Form = props => {
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
const [buttonDisabled, setButtonDisabled] = useState (true);

useEffect(() =>{
formSchema.isValid(box).then(valid => {
    setButtonDisabled(!valid)
})
},[box]);

const validateChange = event => {
    yup.reach(formSchema, event.target.Name)
    .validate(event.target.valid)
    .then(valid => {
        setError({
            ...error,[event.target.Name] : ""
        });
    });
};




const inputChange = event =>{
    // setBox({ ...box, [event.target.name]: event.target.value});
    event.persist();
    const newFormData = {
        ...box, [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setBox(newFormData);
};
const submitForm = event => {
    event.preventDefault();
    props.addNewNote(box);
    setBox({ Name: '',Password: '',Email: ''});
}


    return( 
<div className="note-list">           
<form onSubmit={submitForm}>
    <label htmlFor="name">Name: </label>
        <input 
            id="name" 
            type="text" 
            name="name" 
            onChange={inputChange}
            placeholder="Name"
            value={box.Name}
        />
             {error.name.length > 0 ? <p className="note-list">{error.name}</p> : null}
    <label htmlFor="Password">Password: </label>
        <input id="Password" 
            type="password" 
            name="Password" 
            onChange={inputChange}
            placeholder="Password"
            value={box.Password}
        />

    <label htmlFor="Email">Email: </label>
        <input id="Email" 
            type="text" 
            name="Email" 
            onChange={inputChange}
            placeholder="Email"
            value={box.Email}
        />
    <label htmlFor="Terms" className="terms">    
        <input
        type = "checkbox"
        name="terms"
        onChange={inputChange}
        checked={box.Terms} />
        Terms & Conditions
        </label>
        <button disabled={buttonDisabled}>Submit</button>

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