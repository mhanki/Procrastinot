import React from 'react';
import {
  Card,
  CardBody,
  Row
} from 'reactstrap';
import CardHeader from '../CardHeader/CardHeader';
import TicketDetails from './TicketDetails';
import Comments from './Comments';

const SelectedTicket = ({ ticketInfo, toggleModal }) => {
  let { comments, ...info } = ticketInfo;

  const menuItems = [
    { name: "Edit", action: toggleModal },
    { name: "Remove Assignment", action: () => { return false } }
  ]

  return (
    <Card className="selected-ticket bg-secondary shadow">
      <CardHeader title="Selected Ticket" menu menuItems={menuItems} />
      <CardBody>
        <Row>
          <TicketDetails {...info} />
          <Comments comments={comments} />
        </Row>
      </CardBody>
    </Card>
  )
}

export default SelectedTicket;