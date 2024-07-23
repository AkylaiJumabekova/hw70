import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
    },
});

export const { addContact } = contactsSlice.actions;
export const selectContacts = (state: { contacts: ContactsState }) => state.contacts.contacts;
export default contactsSlice.reducer;
