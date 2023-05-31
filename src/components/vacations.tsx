import { useState, useEffect } from "react";
import http from "../services/httpService";
import moment from "moment";
import Navbar from "./navbar";
let baseURL = 'http://localhost:3003/images/';

function Vacations() {
    const [vacationsList, setVacationList] = useState([]);
    let data: any = localStorage.getItem('user')
    let userId: any = JSON.parse(data).id

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

    const updateFollowers = (vacationId: any, followerId?: any) => {
        console.log(vacationId, 'vacationId')
        console.log(followerId, 'followerId')

        console.log(userId)

        if (followerId?.includes(userId)) {
            updateFollowStatus('unfollow', userId, vacationId)
        } else {
            updateFollowStatus('follow', userId, vacationId)
        }
    }

    const updateFollowStatus = (status: any, userId: any, vacationId: any) => {
        http.updateFollower(userId, vacationId, { status: status })
            .then((response: any) => {
                if (response.status == 200) {
                    if (response.status == 200) {
                        console.log(response)
                        getVacations();
                    }
                }
            })
            .catch((e: Error) => {
                console.error(e);
            });
    }

    return (
        <div className="container App ">
            <Navbar />
            <div className="row d-flex align-items-start justify-content-center h-100 inner-container my-5">
                {vacationsList?.map((vacation: any) =>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card position-relation shadow border-0 mx-2">
                            <div className="card-image">
                                <img src={baseURL + vacation?.image} className="card-img-top object-fit-cover h-100 w-100" alt="Vacations" />
                            </div>

                            <div className="card-body px-0">
                                {vacation.followersArray?.map((followerId: any) =>
                                    <div onClick={() => updateFollowers(vacation.id, vacation.followersArray)} className={`position-absolute pointer ${followerId == userId ? 'bg-light-red text-white' : 'bg-white text-muted'} rounded-pill px-2 py-1 fs-12 likes-container fw-bold `}>
                                        <i className="bi bi-heart me-1"></i>
                                        <span>Like {vacation?.followersCount}</span>
                                    </div>
                                )}
                                {vacation.followersArray.length < 1 &&
                                    <div onClick={() => updateFollowers(vacation.id)} className={`position-absolute pointer bg-white text-muted rounded-pill px-2 py-1 fs-12 likes-container fw-bold `}>
                                        <i className="bi bi-heart me-1"></i>
                                        <span>Like {vacation?.followersCount}</span>
                                    </div>
                                }
                                <div>
                                    <div className="position-absolute w-100 card-title-container">
                                        <h5 className="card-title text-start px-4 text-white fw-bold">{vacation?.destination}</h5>
                                        <p className="bg-light-blue text-start px-4 py-2 fw-bold">
                                            <i className="bi bi-calendar-event fw-bold me-2"></i>
                                            <span>{moment(vacation?.start_date).format('DD.MM.YYYY')}  - {moment(vacation?.end_date).format('DD.MM.YYYY')}</span>
                                        </p>
                                    </div>
                                    <div className="mx-4">
                                        <p className="card-text text-start fs-15 text-muted">
                                            {vacation?.description}
                                        </p>
                                        <button className="btn btn-primary w-100">${vacation?.price}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Vacations;