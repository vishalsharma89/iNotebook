import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Signup(props) {
    //Setting the value of name,email and password which is to be send to fetch api 
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // useHistory hook is used for redirecting to pages
    let history = useHistory();

    //Action to be done after clicking submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = 'http://localhost:5000/api/auth/createuser';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //Manually sending the name, email and password as a body 
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        //Getting the response from backend
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push('/');
            props.showAlert("Account created successfully", "success");

        }
        else {
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    return (
        <div className="container">
            <h3 className="mb-3">Create an Account</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" minLength="3" className="form-control" name="name" value={credentials.name} onChange={onChange} id="name" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" minLength={6} className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" required />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
