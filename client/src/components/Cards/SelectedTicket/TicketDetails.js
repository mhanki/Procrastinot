import React from 'react';
import {
  Card,
  Row,
  Col
} from 'reactstrap';

const Tag = ({name, value, color}) => (
  <div className="tag">
    <div>{name}</div>
    <span className="pill" style={{backgroundColor: `${color}`}}>{value}</span>
  </div>
)

const TicketDetails = ({author, date_created, title, description, time, tags}) => {
  return(
    <Card className="ticket-details custom-shadow">
      <Row>
        <Col className="ticket-info" xs="7">
          <Row>
            <Col>
              <div>Author</div>
              <p>{author}</p>
            </Col>
            <Col>
              <div>Created</div>
              <p>{date_created}</p>
            </Col>
          </Row>
          <Row className="row-2">
            <Col>
              <div>{title}</div>
              <p>{description}</p>
            </Col>
          </Row>
          <Row className="row-3">
            <Col>
              <div>Estimated Time</div>
              <p>{time} hour</p>
            </Col>
          </Row>
        </Col>
        <Col>
          {tags.map(tag => (
            <Tag {...tag} key={tag.name} />
          ))}
        </Col>
      </Row>
    </Card>
  )
}

export default TicketDetails;