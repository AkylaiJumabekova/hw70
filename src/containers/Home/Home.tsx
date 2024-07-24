import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchContacts, deleteContactFromFirebase } from '../../store/contactsThunks';
import { Contact } from '../../types';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = () => {
    navigate('/new-contact');
  };

  const handleEdit = (contact: Contact) => {
    navigate(`/edit-contact/${contact.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteContactFromFirebase(id));
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
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
              <div>
                <button onClick={() => handleEdit(contact)} className="btn btn-secondary mr-2">Edit</button>
                <button onClick={() => handleDelete(contact.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
