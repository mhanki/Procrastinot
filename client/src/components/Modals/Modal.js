import React from 'react';
import { 
  Modal as BModal, 
  Card, CardHeader, CardBody,
  Row, Col, Button,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import DropdownInput from './DropdownInput';

const TagInput = ({tag, values, selectedValue}) => {
  return(
    <FormGroup>
      <Label>{tag}</Label>
      <DropdownInput values={values.map(value => value.name)} selected={selectedValue} />
    </FormGroup>
  )
}

const TagRow = ({tags, selected}) => {
  let [tag1, tag2] = tags

  return (
    <Row>
      <Col className="no-padding-right" md="6">
        <TagInput tag={tag1.name} values={tag1.values} selectedValue={selected[tag1.name].value} />
      </Col>
      {tag2 && (
        <Col md="6">
          <TagInput tag={tag2.name} values={tag2.values} selectedValue={selected[tag2.name].value}/>
        </Col>
      )}
    </Row>
  )
}

const Modal = ({isOpen, toggle, ticketInfo, members, tags }) => {
  let slicedTags = tags.reduce((result, value, index, array) => {
    if(index % 2 === 0) { 
      result.push(array.slice(index, index + 2)) 
    };
    return result;
  }, []);

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
                {slicedTags.map((pair, i) => (
                  <TagRow key={i} tags={pair} selected={ticketInfo.tags}/>
                ))}
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
                  <Input value={ticketInfo.time} />
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

