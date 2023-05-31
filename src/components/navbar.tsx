import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    let user: any = localStorage.getItem('user')
    let currentUser: any = JSON.parse(user);

    const addVacation = () => {
        navigate('/add-vacation')
    }

    const handleVacationRoute = () => {
        if (currentUser.role == 'user') {
            navigate('/vacations')
        } else if (currentUser.role = 'admin') {
            navigate('/admin-vacations')
        }
    }

    const handleHomeRoute = () => {
        if (currentUser.role == 'user') {
            navigate('/user-home')
        } else if (currentUser.role = 'admin') {
            navigate('/admin-home')
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand pointer" onClick={handleVacationRoute}>
                <h4 className="mb-0 text-primary">
                    Vacations
                </h4>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active fw-bold pointer">
                        <a className="nav-link" onClick={handleHomeRoute}>Home</a>
                    </li>
                    <li className="nav-item fw-bold pointer">
                        <a className="nav-link" onClick={handleVacationRoute}>Vacations</a>
                    </li>
                </ul>
                <div className="d-flex align-items-center">
                    <div className="nav-item fw-bold pointer me-4 text-muted">
                        <a className="nav-link" href="/">Logout</a>
                    </div>
                    {currentUser.role === 'admin' && location.pathname === '/admin-vacations' &&
                        <div>
                            <button onClick={addVacation} className="btn btn-primary w-auto rounded-1 fs-12">
                                <i className="bi bi-plus-circle-fill me-2"></i>
                                Add Vacation
                            </button>
                        </div>
                    }
                </div>

                {/* <form className="form-inline my-2 my-lg-0 d-flex">
                    <input className="form-control mr-sm-2 me-3" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        </nav >
    )
}

export default Navbar