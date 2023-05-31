import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../services/httpService";
import moment from "moment";

function AdminVacations() {
    const today = new Date().toDateString();
    const navigate = useNavigate()

    const [vacationsList, setVacationList] = useState([]);

    useEffect(() => {
        getVacations();
    }, []);

    const getVacations = () => {
        http.getVacations()
            .then((response: any) => {
                console.log(response)
                if (response.status == 200) {
                    setVacationList(response.data.vacations);
                }
            })
            .catch((e: Error) => {
                console.error(e);
            });
    }

    const addVacation = () => {
        navigate('/add-vacation')
    }

    return (
        <div className="container App py-5">
            <div className="d-flex justify-content-end mb-3 px-3">
                <button onClick={addVacation} className="btn btn-primary w-auto rounded-1">
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Vacation
                </button>
            </div>
            <div className="row d-flex align-items-center justify-content-center h-100">
                {vacationsList?.map((vacation: any) =>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card position-relation shadow border-0 mx-2">
                            <div className="card-image">
                                <img src={require('../assets/images/images.jpg')} className="card-img-top h-100 w-100" alt="Vacations" />
                            </div>
                            <div className="card-body px-0">
                                <div className="position-absolute fs-12 likes-container fw-bold text-muted">
                                    <div className="d-flex">
                                        <div className="bg-white rounded-pill px-2 py-1">
                                            <i className="bi bi-pencil-fill me-1"></i>
                                            <span>Edit</span>
                                        </div>
                                        <div className="bg-white rounded-pill px-2 py-1 ms-2">
                                            <i className="bi bi-trash-fill me-1"></i>
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="position-absolute w-100 card-title-container">
                                        <h5 className="card-title text-start px-4 text-white fw-bold">{vacation.destination}</h5>
                                        <p className="bg-light-blue text-start px-4 py-2 fw-bold">
                                            <i className="bi bi-calendar-event fw-bold me-2"></i>
                                            <span>{moment(vacation?.start_date).format('DD.MM.YYYY')}  - {moment(vacation?.end_date).format('DD.MM.YYYY')}</span>
                                        </p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="card-text text-start fs-15 text-muted">
                                            {vacation.description}
                                        </p>
                                        <button className="btn btn-primary w-100 rounded-1">${vacation.price}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminVacations