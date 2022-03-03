import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
//import Dashboard from './views/Dashboard';
import Project from './views/Project';

const App = () => {
  return (
    <div>
      <Sidebar />
      <Project />
    </div>
  )
}

export default App