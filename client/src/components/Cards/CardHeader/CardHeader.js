import React from 'react';
import {
  CardHeader as BCardHeader,
  Row,
  Col,
  Button
} from 'reactstrap';
import OverflowMenu from '../../OverflowMenu/OverflowMenu';

const CardHeader = ({title, menu, menuItems, button, buttonText, onClick}) => (
  <BCardHeader className="card-header bg-white border-0">
    <Row className="align-items-center">
      <Col>
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
      {menu && 
        <Col className="no-flex-grow">
          <OverflowMenu items={menuItems} />
        </Col>
      }
    </Row>
  </BCardHeader>
)

export default CardHeader;