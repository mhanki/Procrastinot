import React from "react";
import { 
  Card,
  CardHeader,
  Table,
  Row,
  Col,
} from "reactstrap";
import TablePagination from './TablePagination';

// Mock data
const contacts = [
  {name: 'Michael Scott', email: 'michael_scott@dundermiff.com', phone: '(120)6758-5965'},
  {name: 'Dwight Schrute', email: 'schrutefarms@gmail.com', phone: '(120)6758-5965'},
  {name: 'Kevin Malone', email: 'scrantonicity@gmail.com', phone: '(120)6758-5965'},
]

const pages = [{number: "1", active: true}]



const MemberTable = (props) => {
  return(
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row>
          <Col className="my-auto">
            <h3 className="mb-0">Team</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr>
              <td>
                <span className="text-sm">{contact.name}</span>
              </td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination pages={pages} />
    </Card>
  )
}

export default MemberTable;