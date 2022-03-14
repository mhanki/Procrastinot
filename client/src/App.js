import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Headers/Header';
import { Container } from 'reactstrap';
//import Dashboard from './views/Dashboard';
import Project from './views/Project';

const App = () => {
  return (
    <div id="app">
      <Sidebar />
      <div className="main-content">
        <Header heading="Dashboard" />
        <Container className="mt--7" fluid>
          {/* <Dashboard /> */}
          <Project /> 
        </Container>
      </div>
    </div>
  )
}

export default App;