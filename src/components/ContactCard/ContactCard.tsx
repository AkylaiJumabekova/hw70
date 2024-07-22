import React from 'react';
import { Contact } from '../../types';

interface Props {
    contact: Contact;
    onEdit: () => void;
}

const ContactCard: React.FC<Props> = ({ contact, onEdit }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex">
                    <img src={contact.photo} alt={contact.name} className="img-thumbnail me-3" style={{ width: '100px' }} />
                    <div>
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text">{contact.phone}</p>
                        <p className="card-text">{contact.email}</p>
                        <button className="btn btn-primary" onClick={onEdit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
