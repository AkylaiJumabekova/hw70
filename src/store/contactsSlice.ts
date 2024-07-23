import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import { fetchContacts, addContactToFirebase, updateContactInFirebase } from './contactsThunks';

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addContactToFirebase.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContactInFirebase.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      });
  }
});

export default contactsSlice.reducer;
