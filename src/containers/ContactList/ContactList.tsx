import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../../components/ContactCard/ContactCard';
import { Contact } from '../../types';

const tempContacts: Contact[] = [
    { id: '1', name: 'John Doe', phone: '+996 555 555 555', email: 'john@.space', photo: '#' },
    { id: '2', name: 'Meri Doe', phone: '+996 777 777 777', email: 'meri@.com', photo: '#' },
    { id: '3', name: 'Johnny Doe', phone: '+996 999 999 999', email: 'johnny@.com', photo: '#' },
];

const ContactList: React.FC = () => {
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate('/new');
    };

    const handleEdit = (id: string) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="container mt-4">
            <h1>Contacts</h1>
            <button className="btn btn-primary mb-3" onClick={handleAddNew}>Add new contact</button>
            {tempContacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} onEdit={() => handleEdit(contact.id)} />
            ))}
        </div>
    );
};

export default ContactList;
