import React from 'react';
import { CardHeader, Row, Col } from 'reactstrap';

const ModalCardHeader = ({title, closeModal}) => {
  return (
    <CardHeader className="card-header bg-white border-0">
      <Row className="align-items-center">
        <Col>
          <h3 className="mb-0">{title}</h3>
        </Col>
        <Col className="no-flex-grow">
          <button onClick={closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </Col>
      </Row>
    </CardHeader>
  )
}

export default ModalCardHeader;