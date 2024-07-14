import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loadlist.css';

const LoadList = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cargo/all');
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
            await axios.post('http://localhost:8080/api/cargo/markAsReceived', null, {
                params: { id, receivedBy, identificationNumber }
            });
            const response = await axios.get('http://localhost:8080/api/cargo/all');
            setLoads(response.data);
        } catch (error) {
            console.error('Error marking cargo as received', error);
        }
    };

    const handleDeleteCargo = async (id) => {
        if (window.confirm('Are you sure you want to delete this cargo?')) {
            try {
                await axios.delete(`http://localhost:8080/api/cargo/delete/${id}`);
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
                                <td>{load.loadNumber}</td>
                                <td>{load.senderName}</td>
                                <td>{load.senderPhone}</td>
                                <td>{load.paymentAmount}</td>
                                <td>{load.loadType}</td>
                                <td>{load.recipientName}</td>
                                <td>{load.recipientPhone}</td>
                                <td>{load.isReceived ? 'Received' : 'Sent'}</td>
                                <td>{load.receivedBy || '-'}</td>
                                <td>{load.identificationNumber || '-'}</td>
                                <td>{load.submittedAt ? new Date(load.submittedAt).toLocaleString() : '-'}</td>
                                <td>{load.receivedAt ? new Date(load.receivedAt).toLocaleString() : '-'}</td>
                                <td>
                                    {!load.isReceived && (
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
