import httpCommon from "../http-common";
import axios from "axios";

const headers: any = {
    "Content-type": "application/json"
}

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

const login: any = (data: any) => {
    return httpCommon.post("/login", data, headers);
};

const register: any = (data: any) => {
    return httpCommon.post("/register", data, headers);
};

const addVacation: any = (data: any) => {
    return httpCommon.post("/vacations", data, config);
};

const updateVacation: any = (id: any, data: any) => {
    return httpCommon.put(`/update-vacations/${id}`, data, config);
};

const getVacations: any = () => {
    return httpCommon.get("/vacations-list", headers);
};

const getVacationById: any = (id: any) => {
    return httpCommon.get(`/vacations-by-id/${id}`, headers);
};

const deleteVacation: any = (id: any) => {
    return httpCommon.delete(`/delete-vacations/${id}`, headers);
};

const updateFollower: any = (user_id: any, vacation_id: any, data: any) => {
    return httpCommon.post(`/followers?user_id=${user_id}&vacation_id=${vacation_id}`, data, headers);
};

const http = {
    login,
    register,
    addVacation,
    updateVacation,
    getVacations,
    getVacationById,
    updateFollower,
    deleteVacation
};

export default http;