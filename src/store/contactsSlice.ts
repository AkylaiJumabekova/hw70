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
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            const newContacts = [];
            for (let i = 0; i < state.contacts.length; i++) {
                if (state.contacts[i].id !== action.payload) {
                    newContacts.push(state.contacts[i]);
                }
            }
            state.contacts = newContacts;
        }
    },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
