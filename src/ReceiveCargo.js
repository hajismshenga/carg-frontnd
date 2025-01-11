import React, { useState } from 'react';
import axios from 'axios';
import './receiveCargo.css';

const ReceiveCargo = () => {
    const [details, setDetails] = useState({
        id: '',
        receivedBy: '',
        identificationNumber: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReceive = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/cargo/receive', null, {
                params: {
                    id: details.id,
                    receivedBy: details.receivedBy,
                    identificationNumber: details.identificationNumber
                }
            });
            setMessage('Cargo received successfully');
        } catch (error) {
            console.error('There was an error receiving the cargo!', error);
            setMessage('Error receiving cargo');
        }
    };

    return (
        <div>
            <form onSubmit={handleReceive}>
                <input type="text" name="id" placeholder="Load ID" onChange={handleChange} />
                <input type="text" name="receivedBy" placeholder="Received By" onChange={handleChange} />
                <input type="text" name="identificationNumber" placeholder="Identification Number" onChange={handleChange} />
                <button type="submit">Receive</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReceiveCargo;
