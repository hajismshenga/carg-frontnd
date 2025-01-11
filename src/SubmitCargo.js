import React, { useState } from 'react';
import axios from 'axios';
import './submitcargo.css';

const SubmitCargo = () => {
    const [loadNumber, setLoadNumber] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [loadType, setLoadType] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cargo = {
            loadNumber,
            senderName,
            senderPhone,
            paymentAmount: parseFloat(paymentAmount),
            loadType,
            recipientName,
            recipientPhone,
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/cargo/submit/', cargo);
            alert('Cargo submitted successfully!');
        } catch (error) {
            console.error('Error submitting cargo', error);
            alert('Error submitting cargo');
        }
    };

    return (
        <div>
            <h2>Submit Cargo</h2>
            <form onSubmit={handleSubmit}>
                <label>Load Number:</label>
                <input
                    type="text"
                    value={loadNumber}
                    onChange={(e) => setLoadNumber(e.target.value)}
                    required
                />
                <label>Sender Name:</label>
                <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                />
                <label>Sender Phone:</label>
                <input
                    type="text"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    required
                />
                <label>Payment Amount:</label>
                <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                />
                <label>Load Type:</label>
                <input
                    type="text"
                    value={loadType}
                    onChange={(e) => setLoadType(e.target.value)}
                    required
                />
                <label>Recipient Name:</label>
                <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                />
                <label>Recipient Phone:</label>
                <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    required
                />
                <button type="submit">Submit Cargo</button>
            </form>
        </div>
    );
};

export default SubmitCargo;
