import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactList: React.FC = () => {
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate('/new');
    };

    return (
        <div className="container mt-4">
            <h1>Contacts</h1>
            <button className="btn btn-primary mb-3" onClick={handleAddNew}>Add new contact</button>
            {}
        </div>
    );
};

export default ContactList;
