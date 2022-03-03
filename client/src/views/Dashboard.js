import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Headers/Header';
import ProjectTable from '../components/Tables/ProjectTable';
import PieChart from '../components/Charts/PieChart';

// Mock data
const data1 = {
  labels: ['Issues', 'Feature Requests', 'Bugs'],
  datasets: [
    {
      label: "Tickets By Type",
      data: [58, 35, 17],
      backgroundColor: ['#5388D8', '#F4BE37', '#FB6340']
    }
  ]
}

const data2 = {
  labels: ['In Progress', 'Closed', 'Open'],
  datasets: [
    {
      label: "Tickets By Status",
      data: [30, 54, 16],
      backgroundColor: ['#F4BE37', '#5388D8', '#FB6340']
    }
  ]
}

const Dashboard = () => {
  return (
    <div className="main-content">
      <Header heading="Dashboard" />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <ProjectTable />
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
      </Container>
    </div>
  )
}

export default Dashboard