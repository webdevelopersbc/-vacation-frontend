import { useState } from "react";
import http from "../services/httpService";
import { useNavigate } from "react-router-dom";

function AddVacation() {
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('')
    const [price, setPrice] = useState('')
    const [errorMessages, setErrorMessages] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        price: '',
    });
    const navigate = useNavigate();
    let file: any
    let formData = new FormData();

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const handlestartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleFileChange = (e: any) => {
        file = e.target.files[0]
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessages({
            destination: '',
            startDate: '',
            endDate: '',
            price: '',
        });
        let hasErrors = false;

        if (!destination) {
            setErrorMessages((prevState) => ({ ...prevState, firstName: 'Destination is required' }));
            hasErrors = true;
        }

        if (!startDate) {
            setErrorMessages((prevState) => ({ ...prevState, lastName: 'Start date is required' }));
            hasErrors = true;
        }

        if (!endDate) {
            setErrorMessages((prevState) => ({ ...prevState, lastName: 'Enddate is required' }));
            hasErrors = true;
        }

        if (!price) {
            setErrorMessages((prevState) => ({ ...prevState, lastName: 'Price is required' }));
            hasErrors = true;
        }

        if (!hasErrors) {
            formData.append('destination', destination)
            formData.append('description', description)
            formData.append('start_date', startDate)
            formData.append('end_date', endDate)
            formData.append('price', price)
            formData.append('image', file)

            http.addVacation(formData)
                .then((response: any) => {
                    console.log(response)
                    if (response.status == 200) {
                        navigate('/admin-vacations')
                    }
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        }

    }
    return (
        <div className="container App">
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card border-0 w-100 p-3 shadow">
                        <div className="card-header bg-transparent border-0 text-primary">
                            <h3 className='card-title fw-bold'>Add Vacation</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label htmlFor="destination" className="form-label text-muted fw-semibold fs-14">Destination</label>
                                    <input value={destination} onChange={handleDestinationChange} id='destination' className="form-control p-2 fs-14" type="text" />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="description" className="form-label text-muted fw-semibold fs-14">Description</label>
                                    <textarea value={description} onChange={handleDescriptionChange} id='description' className="form-control p-2 fs-14" />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mb-3 text-start col-6 me-3">
                                        <label htmlFor="startDate" className="form-label text-muted fw-semibold fs-14">Start Date</label>
                                        <input value={startDate} onChange={handlestartDateChange} id="startDate" type="date" className="form-control p-2 fs-14" />
                                    </div>
                                    <div className="mb-3 text-start col-6">
                                        <label htmlFor="endDate" className="form-label text-muted fw-semibold fs-14">End Date</label>
                                        <input value={endDate} onChange={handleEndDateChange} id="endDate" type="date" className="form-control p-2 fs-14" />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mb-3 text-start  col-6 me-3">
                                        <label htmlFor="price" className="form-label text-muted fw-semibold fs-14">Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent">$</span>
                                            <input value={price} onChange={handlePriceChange} id='price' className="form-control p-2 fs-14 border-start-0" type="text" />
                                        </div>
                                    </div>
                                    <div className="mb-3 text-start col-6">
                                        <label htmlFor="image" className="form-label text-muted fw-semibold fs-14">Cover Image</label>
                                        <div className='upload-file'>
                                            <input onChange={handleFileChange} id="image" type="file" accept="image/*" className="form-control p-2 fs-14" />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-3 text-start">
                                    <button type="submit" className="btn btn-primary fw-bold w-100 p-2">Add Vacation</button>
                                    {/* <button type="button" className="btn btn-primary fw-bold w-100">Update Vacation</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVacation