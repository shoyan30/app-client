import React from 'react';
import Navbar from './layouts/Navbar.jsx';   // Ensure this path is correct
import PageHeader from './layouts/PageHeader.jsx';   // Ensure this path is correct
import Branch from './Pages/Home/Branch/Branch.jsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <PageHeader />
      {/* Add more components here if necessary */}
      <Branch /> 
    </div>
  );
};

export default App;