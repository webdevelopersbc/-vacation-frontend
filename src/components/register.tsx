import React, { useState } from 'react';
import http from '../services/httpService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error messages
        setErrorMessages({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });

        // Validate form fields
        let hasErrors = false;

        if (!firstName) {
            setErrorMessages((prevState) => ({ ...prevState, firstName: 'First name is required' }));
            hasErrors = true;
        }

        if (!lastName) {
            setErrorMessages((prevState) => ({ ...prevState, lastName: 'Last name is required' }));
            hasErrors = true;
        }

        if (!email) {
            setErrorMessages((prevState) => ({ ...prevState, email: 'Email is required' }));
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            setErrorMessages((prevState) => ({ ...prevState, email: 'Invalid email address' }));
            hasErrors = true;
        }

        if (!password) {
            setErrorMessages((prevState) => ({ ...prevState, password: 'Password is required' }));
            hasErrors = true;
        } else if (password.length < 4) {
            setErrorMessages((prevState) => ({
                ...prevState,
                password: 'Password must be at least 4 characters',
            }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        if (!hasErrors) {
            // Proceed with registration logic
            http.register({ firstName: firstName, lastName: lastName, email: email, password: password, role: 'admin' })
                .then((response: any) => {
                    if (response.status == 200) {
                        navigate('/')
                    }
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        }
    };

    const isValidEmail = (email: string) => {
        // Basic email validation (can be improved as per requirements)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="container App">
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card border-0 w-100 p-3 shadow">
                        <div className="card-header bg-transparent border-0 text-primary">
                            <h3 className="card-title fw-bold">Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label htmlFor="fname" className="form-label text-muted fw-semibold fs-14">
                                        First Name
                                    </label>
                                    <input
                                        id="fname"
                                        className="form-control p-2 fs-14"
                                        type="text"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                    {errorMessages.firstName && (
                                        <div className="text-danger">{errorMessages.firstName}</div>
                                    )}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="lname" className="form-label text-muted fw-semibold fs-14">
                                        Last Name
                                    </label>
                                    <input
                                        id="lname"
                                        className="form-control p-2 fs-14"
                                        type="text"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                    />
                                    {errorMessages.lastName && (
                                        <div className="text-danger">{errorMessages.lastName}</div>
                                    )}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label text-muted fw-semibold fs-14">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control p-2 fs-14"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {errorMessages.email && (
                                        <div className="text-danger">{errorMessages.email}</div>
                                    )}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-muted fw-semibold fs-14">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control p-2 fs-14"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {errorMessages.password && (
                                        <div className="text-danger">{errorMessages.password}</div>
                                    )}
                                </div>
                                <div className="mb-3 text-start">
                                    <button type="submit" className="btn btn-primary fw-bold w-100">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div>
                                <p className="text-muted mb-0">Already a member?</p>
                                <a href="/" className="text-primary fw-semibold">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
