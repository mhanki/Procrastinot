import React, { useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import {
  Modal as BModal,
  Card, CardBody,
  Row, Col, 
  Button, Form
} from 'reactstrap';
import ModalCardHeader from '../Cards/CardHeader/ModalCardHeader';
import TagInputs from './TagInputs/TagInputs';
import DevMultiselect from './DevMultiselect/DevMultiselect';
import TextInput from './TextInput/TextInput';

const Modal = ({ isOpen, toggle, ticketInfo, setTicketInfo, members, tags }) => {
  const [newTicketInfo, setNewTicketInfo] = useState(cloneDeep(ticketInfo));

  const updateInfo = (key, value) => {
    let newInfo = cloneDeep(newTicketInfo);

    switch (key) {
      case 'tags':
        newInfo[key][value[0]].value = value[1]
        break
      default:
        newInfo[key] = value
    }

    setNewTicketInfo(newInfo);
  }

  const handleSubmit = () => {
    setTicketInfo(newTicketInfo);
    toggle()
  }

  const toggleModal = () => {
    setNewTicketInfo(cloneDeep(ticketInfo));
    toggle();
  }

  return (
    <BModal isOpen={isOpen} toggle={toggleModal} >
      <Card className="bg-secondary">
        <ModalCardHeader title="Edit Ticket" closeModal={toggleModal} />
        <CardBody>
          <Form>
            <Row>
              <Col md="7">
                <TagInputs
                  tags={tags}
                  ticketInfo={newTicketInfo}
                  updateInfo={updateInfo}
                  size="sm"
                />
              </Col>
              <Col>
                <DevMultiselect
                  members={members}
                  assignees={newTicketInfo.assigned}
                  updateInfo={updateInfo}
                />
                <TextInput
                  label="Estimated Time (Hours)"
                  value={newTicketInfo.time}
                  handleChange={(value) => updateInfo('time', value)}
                />
              </Col>
            </Row>
            <Button color="success" onClick={() => handleSubmit()}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </BModal>
  )
}

export default Modal;