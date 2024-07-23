import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Contact } from '../types';

export const fetchContacts = createAsyncThunk<Contact[], void, { state: any }>(
    'contacts/fetchContacts',
    async () => {
        const response = await axiosApi.get('/contacts.json');
        const data = response.data;
        const contacts: Contact[] = data
            ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            : [];
        return contacts;
    }
);

export const addContactToFirebase = createAsyncThunk<Contact, Contact, { state: any }>(
    'contacts/addContactToFirebase',
    async (contact) => {
        const response = await axiosApi.post('/contacts.json', contact);
        return { ...contact, id: response.data.name };
    }
);

export const updateContactInFirebase = createAsyncThunk<Contact, Contact, { state: any }>(
    'contacts/updateContactInFirebase',
    async (contact) => {
        await axiosApi.put(`/contacts/${contact.id}.json`, contact);
        return contact;
    }
);
