import React, { useState, useEffect } from "react";
import { Row, Col } from 'reactstrap';
import Modal from '../components/Modals/Modal';
import MemberTable from '../components/Tables/MemberTable';
import TicketsTable from '../components/Tables/TicketsTable';
import SelectedTicket from '../components/Cards/SelectedTicket/SelectedTicket';

// Mock data
import { projectData as data } from '../mockData';

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(data.tickets.filter(ticket => ticket._id === 1)[0]);
  const [members, setMembers] = useState(data.members);
  const [tickets, setTickets] = useState(data.tickets);
  const [tags, setTags] = useState(data.tags);

  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        ticketInfo={ticketInfo}
        setTicketInfo={setTicketInfo}
        members={members}
        tags={tags}
      />
      <Row>
        <Col md="auto" lg="5">
          <MemberTable members={members} />
        </Col>
        <Col>
          <TicketsTable tickets={tickets} />
        </Col>
      </Row>
      <Row className="mt-5 mb-5 ticket-container">
        <SelectedTicket ticketInfo={ticketInfo} toggleModal={toggleModal} />
      </Row>
    </>
  )
}

export default Project;