import React from "react";
import {
  Row,
  Col
 } from 'reactstrap';
 import Modal from '../components/Modals/Modal';
import MemberTable from '../components/Tables/MemberTable';
import TicketsTable from '../components/Tables/TicketsTable';
import SelectedTicket from '../components/Cards/SelectedTicket/SelectedTicket';

// Mock data
import { members, tickets, ticketInfo } from '../mockData';

const Project = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const modalToggle = () => setModalOpen(prevState => !prevState);

  return(
    <>
      <Modal isOpen={isModalOpen} toggle={modalToggle} />
      <Row>
        <Col md="auto" lg="5">
          <MemberTable members={members} />
        </Col>
        <Col>
          <TicketsTable tickets={tickets} />
        </Col>
      </Row>
      <Row className="mt-5 mb-5 ticket-container">
        <SelectedTicket ticketInfo={ticketInfo} modalToggle={modalToggle} />
      </Row>
    </>
  )
}

export default Project;