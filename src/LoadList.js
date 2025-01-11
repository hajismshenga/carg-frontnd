import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loadlist.css';

const LoadList = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cargo/');
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching load details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoads();
    }, []);

    const handleMarkAsReceived = async (id) => {
        const receivedBy = prompt('Enter received by name:');
        const identificationNumber = prompt('Enter identification number:');
        try {
            await axios.post(`http://127.0.0.1:8000/api/cargo/${id}/receive/`, {
                receivedBy,
                identificationNumber
            });
            const response = await axios.get('http://127.0.0.1:8000/api/cargo/');
            setLoads(response.data);
        } catch (error) {
            console.error('Error marking cargo as received', error);
        }
    };

    const handleDeleteCargo = async (id) => {
        if (window.confirm('Are you sure you want to delete this cargo?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cargo/${id}/`);
                setLoads(loads.filter(load => load.id !== id));
            } catch (error) {
                console.error('Error deleting cargo', error);
            }
        }
    };

    return (
        <div>
            <h2>All Load Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Load Number</th>
                            <th>Sender Name</th>
                            <th>Sender Phone</th>
                            <th>Payment Amount</th>
                            <th>Load Type</th>
                            <th>Recipient Name</th>
                            <th>Recipient Phone</th>
                            <th>Status</th>
                            <th>Received By</th>
                            <th>Identification Number</th>
                            <th>Submitted At</th>
                            <th>Received At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loads.map((load) => (
                            <tr key={load.id}>
                                <td>{load.load_number}</td>
                                <td>{load.sender_name}</td>
                                <td>{load.sender_phone}</td>
                                <td>{load.payment_amount}</td>
                                <td>{load.load_type}</td>
                                <td>{load.recipient_name}</td>
                                <td>{load.recipient_phone}</td>
                                <td>{load.is_received ? 'Received' : 'Sent'}</td>
                                <td>{load.received_by || '-'}</td>
                                <td>{load.identification_number || '-'}</td>
                                <td>{load.submitted_at ? new Date(load.submitted_at).toLocaleString() : '-'}</td>
                                <td>{load.received_at ? new Date(load.received_at).toLocaleString() : '-'}</td>
                                <td>
                                    {!load.is_received && (
                                        <button onClick={() => handleMarkAsReceived(load.id)}>
                                            Mark as Received
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteCargo(load.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LoadList;
