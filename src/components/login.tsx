import { useEffect, useState } from "react"
import { userLogin } from "../http-common";
import { useNavigate } from "react-router-dom";
import http from "../services/httpService";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('login useeffect call()')
    })

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Reset error message
        setErrorMessage('');

        // Validate form fields
        if (!email || !password) {
            setErrorMessage('All fields are mandatory');
            return;
        }

        if (!isValidEmail(email)) {
            setErrorMessage('Make sure that the email is correct');
            return;
        }

        if (password.length < 4) {
            setErrorMessage('Password must be at least 4 characters');
            return;
        }

        // Proceed with login logic
        http.login({ email: email, password: password })
            .then((response: any) => {
                if (response.status == 200) {
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    if (response.data.user.role == 'user') {
                        navigate('/vacations')
                    } else if (response.data.user.role == 'admin') {
                        navigate('/admin-vacations')
                    } else {
                        navigate('/register')
                    }
                }
            })
            .catch((e: Error) => {
                console.error(e);
            });

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
                            <h3 className='card-title fw-bold'>Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label text-muted fw-semibold fs-14">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control p-2 fs-14"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {errorMessage && (
                                        <div className="text-danger">{errorMessage}</div>
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
                                    {errorMessage && (
                                        <div className="text-danger">{errorMessage}</div>
                                    )}
                                </div>
                                <div className="mb-3 text-start">
                                    <button type="submit" className="btn btn-primary fw-bold w-100">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div>
                                <p className="text-muted mb-0">Don't have an account?</p>
                                <a href="/register" className="text-primary fw-semibold">
                                    Register Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login