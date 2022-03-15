import React from 'react';
import {
  Modal as BModal,
  Card, CardBody,
  Row, Col, Button,
  Form
} from 'reactstrap';
import ModalCardHeader from '../Cards/CardHeader/ModalCardHeader';
import TagInputs from './TagInputs/TagInputs';
import DevMultiselect from './DevMultiselect/DevMultiselect';
import TextInput from './TextInput/TextInput';

const Modal = ({ isOpen, toggle, ticketInfo, members, tags }) => {
  return (
    <BModal isOpen={isOpen} toggle={toggle} >
      <Card className="bg-secondary">
        <ModalCardHeader title="Edit Ticket" closeModal={toggle} />
        <CardBody>
          <Form>
            <Row>
              <Col md="7">
                <TagInputs tags={tags} ticketInfo={ticketInfo} size="sm" />
              </Col>
              <Col>
                <DevMultiselect members={members} />
                <TextInput label="Estimated Time (Hours)" />
              </Col>
            </Row>
            <Button color="success">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </BModal>
  )
}

export default Modal;