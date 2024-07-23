import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateContactInFirebase, fetchContacts } from '../../store/contactsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../../types';

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contacts = useAppSelector(state => state.contacts.contacts);
  const [contactData, setContactData] = useState<Contact | null>(null);

  useEffect(() => {
    if (!contacts.length) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length]);

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      setContactData(contact);
    } else {
      setContactData(null);
    }
  }, [contacts, id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactData(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (contactData) {
      try {
        await dispatch(updateContactInFirebase(contactData));
        navigate('/');
      } catch (error) {
        console.error('Failed to update contact:', error);
      }
    }
  };

  if (!contactData) {
    return <h1>Contact not found!</h1>;
  }

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
