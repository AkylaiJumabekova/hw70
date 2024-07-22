import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../../types';

const tempContacts: Contact[] = [
    { id: '1', name: 'John Doe', phone: '+996 555 555 555', email: 'john@.space', photo: '#' },
    { id: '2', name: 'Meri Doe', phone: '+996 777 777 777', email: 'meri@.com', photo: '#' },
    { id: '3', name: 'Johnny Doe', phone: '+996 999 999 999', email: 'johnny@.com', photo: '#' },
];

const EditContact: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact | undefined>(undefined);

    useEffect(() => {
        const foundContact = tempContacts.find(contact => contact.id === id);
        setContact(foundContact);
    }, [id]);

    const handleSave = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    if (!contact) {
        return <p>Contact not found</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Edit Contact</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </div>
            <div className="mb-3">
                <label className="form-label">Photo</label>
                <input type="text" className="form-control" value={contact.photo} onChange={(e) => setContact({ ...contact, photo: e.target.value })} />
                {contact.photo && <img src={contact.photo} alt="Preview" className="img-thumbnail mt-2" />}
            </div>
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={handleBack}>Back to contacts</button>
        </div>
    );
};

export default EditContact;
