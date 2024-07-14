import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SubmitCargo from './SubmitCargo';
import ReceiveCargo from './ReceiveCargo';
import LoadList from './LoadList';

// Import components as before

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/submit-cargo">Submit Cargo</Link>
                        </li>
                        <li>
                            <Link to="/receive-cargo">Receive Cargo</Link>
                        </li>
                        <li>
                            <Link to="/load-list">Load List</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/submit-cargo" element={<SubmitCargo />} />
                    <Route path="/receive-cargo" element={<ReceiveCargo />} />
                    <Route path="/load-list" element={<LoadList />} />
                    <Route path="/" element={<h2>Welcome to the Cargo Tracking System</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
