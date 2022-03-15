import React from "react";
import {
  CardHeader,
  Row,
  Col,
  Button
} from "reactstrap";

const TableHeader = ({ title, button = false, buttonText, onClick }) => (
  <CardHeader className={`table-header ${button ? 'with-btn' : ''} border-0`}>
    <Row>
      <Col className="my-auto">
        <h3 className="mb-0">{title}</h3>
      </Col>
      {button &&
        <Col className="text-right" xs="4">
          <Button
            color="primary"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </Col>
      }
    </Row>
  </CardHeader>
)

export default TableHeader;