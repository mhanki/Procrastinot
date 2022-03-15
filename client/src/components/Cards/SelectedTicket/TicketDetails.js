import React from 'react';
import {
  Card,
  Row,
  Col
} from 'reactstrap';

const Tag = ({ name, status }) => (
  <div className="tag">
    <div className="info-heading">{name}</div>
    <span className="pill" style={{ backgroundColor: `${status.color}` }}>{status.value}</span>
  </div>
)

const TicketDetails = ({ created_by, date_created, title, description, time, assigned, tags }) => {
  return (
    <Card className="ticket-details custom-shadow">
      <Row>
        <Col className="ticket-info" xs="7">
          <Row>
            <Col>
              <div className="info-heading">Author</div>
              <p>{created_by}</p>
            </Col>
            <Col>
              <div className="info-heading">Created</div>
              <p>{date_created}</p>
            </Col>
          </Row>
          <Row className="row-2">
            <Col>
              <h3>{title}</h3>
              <p>{description}</p>
            </Col>
          </Row>
          <Row className="row-3">
            <Col>
              <div className="info-heading">Estimated Time</div>
              <p>{time} hour</p>
            </Col>
          </Row>
        </Col>
        <Col>
          {Object.keys(tags).map(tag => (
            <Tag name={tag} status={tags[tag]} key={tag} />
          ))}
          <div className="assignee-info">
            <div className="info-heading">Assigned</div>
            <p>{assigned[0]}</p>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default TicketDetails;