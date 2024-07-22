import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import ContactList from './containers/ContactList/ContactList';
import AddContact from './containers/AddContact/AddContact';

const App: React.FC = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/new" element={<AddContact />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
