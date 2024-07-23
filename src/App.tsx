import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import NewContact from './containers/NewContact/NewContact';
import EditContact from './containers/EditContact/EditContact';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
