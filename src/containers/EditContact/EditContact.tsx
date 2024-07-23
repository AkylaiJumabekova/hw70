import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateContact } from '../../store/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const contacts = useAppSelector(state => state.contacts.contacts);
    const contact = contacts.find((contact) => contact.id === id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        id: '',
        name: '',
        phone: '',
        email: '',
        photo: ''
    });

    useEffect(() => {
        if (contact) {
            setContactData(contact);
        }
    }, [contact]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setContactData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateContact(contactData));
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Edit contact</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={contactData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={contactData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={contactData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                    type="url"
                    id="photo"
                    name="photo"
                    className="form-control"
                    value={contactData.photo}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <img src={contactData.photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Save
            </button>
        </form>
    );
};

export default EditContact;
