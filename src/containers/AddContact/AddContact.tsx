import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSave = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <h1>Add New Contact</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Photo</label>
                <input type="text" className="form-control" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                {photo && <img src={photo} alt="Preview" className="img-thumbnail mt-2" />}
            </div>
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={handleBack}>Back to contacts</button>
        </div>
    );
};

export default AddContact;
