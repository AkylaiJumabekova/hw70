import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectContacts } from '../../store/contactsSlice';
import { Contact } from '../../types';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const contacts = useAppSelector(selectContacts);
    const navigate = useNavigate();

    const handleAddContact = () => {
        navigate('/new-contact');
    };

    return (
        <div>
            <h4>Contacts</h4>
            <button onClick={handleAddContact} className="btn btn-primary mb-3">
                Add new contact
            </button>
            <div>
                {contacts.map((contact: Contact) => (
                    <div key={contact.id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p className="card-text">{contact.phone}</p>
                            <p className="card-text">{contact.email}</p>
                            <img src={contact.photo} alt={contact.name} style={{ width: '50px', height: '50px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
