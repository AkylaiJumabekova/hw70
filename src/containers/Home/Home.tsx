import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchContacts, deleteContactFromFirebase } from '../../store/contactsThunks';
import { Contact } from '../../types';
import { useNavigate } from 'react-router-dom';
import ContactModal from '../../components/ContactModal/ContactModal';

const Home: React.FC = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <h4>Contacts</h4>
      <button onClick={handleAddContact} className="btn btn-primary mb-3">
        Add new contact
      </button>
      <div>
        {contacts.map((contact: Contact) => (
          <div
            key={contact.id}
            className="card mb-2"
            onClick={() => handleContactClick(contact)}
          >
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text">{contact.phone}</p>
              <p className="card-text">{contact.email}</p>
              <img src={contact.photo} alt={contact.name} style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        ))}
      </div>
      {selectedContact && (
        <ContactModal
          show={!!selectedContact}
          title={selectedContact.name}
          onClose={handleCloseModal}
        >
          <div className="modal-body">
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <img src={selectedContact.photo} alt={selectedContact.name} style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            <button className="btn btn-primary" onClick={() => handleEdit(selectedContact)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(selectedContact.id)}>Delete</button>
          </div>
        </ContactModal>
      )}
    </div>
  );
};

export default Home;
