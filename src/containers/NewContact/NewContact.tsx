import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addContact } from '../../store/contactsSlice';
import { useNavigate } from 'react-router-dom';

const NewContact: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
        photo: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const generateId = () => {
        return Math.floor(Math.random() * 32) + 5; 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newContact = {
            ...contact,
            id: generateId().toString()
        };

        try {
            dispatch(addContact(newContact));
            navigate('/');
        } finally {
        }
    };

    let form = (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={contact.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    className="form-control"
                    value={contact.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={contact.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                    id="photo"
                    type="url"
                    name="photo"
                    className="form-control"
                    value={contact.photo}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group mt-3">
                <img src={contact.photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Save
            </button>
        </form>
    );

    return (
        <div className="row mt-2">
            <div className="col">{form}</div>
        </div>
    );
};

export default NewContact;
