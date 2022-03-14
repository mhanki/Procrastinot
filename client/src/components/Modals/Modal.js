import React from 'react';
import { 
  Modal as BModal, 
  Card, CardHeader, CardBody,
  Row, Col, Button,
  Form, FormGroup, Input, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const DropdownInput = ({values}) => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(prevState => !prevState);
  const [selectedValue, setSelectedValue] = React.useState(values[0]);

  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle caret>
        {selectedValue}
      </DropdownToggle>
      <DropdownMenu>
        {values.map(value => (
          <Item key={value} value={value} setSelectedValue={setSelectedValue} />
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const Item = ({value, setSelectedValue}) => (
  <DropdownItem onClick={() => setSelectedValue(value)}>
    {value}
  </DropdownItem>
)

const Modal = ({isOpen, toggle, developers=["Michael Scott", "Dwight Schrute"]}) => {
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
                  <Row>
                    <Col className="no-padding-right" md="6">
                      <FormGroup>
                        <Label>Status</Label>
                        <DropdownInput values={["Open", "In Progress", "Closed"]} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Priority</Label>
                        <DropdownInput values={["Medium", "High", "Low"]} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="no-padding-right" md="6">
                      <FormGroup>
                        <Label>Type</Label>
                        <DropdownInput values={["Issue", "Feature Request", "Bug"]} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Custom Tag 1</Label>
                        <DropdownInput values={["Val 1", "Val 2", "Val 3"]} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Assign Developer</Label>
                    <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" >
                      {developers.map(developer => (
                        <option key={developer}>
                          {developer}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Estimated Time (Hours)</Label>
                    <Input>
                    </Input>
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

