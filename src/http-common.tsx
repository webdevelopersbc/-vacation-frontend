import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3003/",
    // headers: {
    //     "Content-type": "application/json"
    // }
});

export const userLogin = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:3003/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (err) {
        return err;
    }
};