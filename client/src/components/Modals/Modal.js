import React from 'react';
import { 
  Modal as BModal, 
  Card, CardHeader, CardBody,
  Row, Col, Button,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import TagInputs from './TagInputs/TagInputs';

const Modal = ({isOpen, toggle, ticketInfo, members, tags }) => {
  return(
    <BModal isOpen={isOpen} toggle={toggle} >
      <Card className="bg-secondary">
        <CardHeader className="card-header bg-white border-0">
          <Row className="align-items-center">
            <Col>
              <h3 className="mb-0">Edit Ticket</h3>
            </Col>
            <Col className="no-flex-grow">
              <button onClick={toggle} type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md="7">
                <TagInputs tags={tags} ticketInfo={ticketInfo} size="sm"/>
              </Col>
              
              <Col>
                <FormGroup>
                  <Label>Assign Developer</Label>
                  <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" >
                    {members.map(({user}) => (
                      <option key={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Estimated Time (Hours)</Label>
                  <Input />
                </FormGroup>
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

