import React from 'react';
import { Row, Col } from 'reactstrap';
import ProjectTable from '../components/Tables/ProjectTable';
import PieChart from '../components/Charts/PieChart';

// Mock data
import { data1, data2, projects } from '../mockData';

const Dashboard = () => {
  return (
    <>
      <Row>
        <div className="col">
          <ProjectTable projects={projects} />
        </div>
      </Row>
      <Row className="mb-5">
        <Col className="mt-5">
          <PieChart title="Tickets By Type" data={data1} />
        </Col>
        <Col className="mt-5">
          <PieChart title="Tickets By Status" data={data2} />
        </Col>
        <Col className="mt-5">
          <PieChart title="Tickets By Prioity" data={data1} />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;