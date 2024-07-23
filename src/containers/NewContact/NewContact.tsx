import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addContactToFirebase } from '../../store/contactsThunks';
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(addContactToFirebase(contact));
      navigate('/');
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
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
            />
          </div>
          <div className="form-group mt-3">
            <img src={contact.photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewContact;
