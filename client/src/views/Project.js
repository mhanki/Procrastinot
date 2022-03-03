import React from "react";
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Headers/Header';
import MemberTable from '../components/Tables/MemberTable';
import TicketsTable from '../components/Tables/TicketsTable';

const Project = () => {

  return(
    <div className="main-content">
      <Header heading="Project" />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="auto" lg="5">
            <MemberTable />
          </Col>
          <Col>
            <TicketsTable />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Project;