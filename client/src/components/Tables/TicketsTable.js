import React from "react";
import { 
  Card,
  CardHeader,
  Table,
  Row,
  Col
} from "reactstrap";
import TablePagination from './TablePagination';

// Mock data
const tickets = [
  {title: 'Create DB Schema', status: 'Open', type: 'Feature', created_by: 'Michael Scott', priority: 'High'},
  {title: 'Write Documentation', status: 'In Progress', type: 'Feature', created_by: 'Dwight Schrute', priority: 'Medium'},
  {title: 'Create Restful API Routes', status: 'Open', type: 'Feature', created_by: 'Michael Scott', priority: 'High'},
  {title: 'Fix Typo', status: 'Open', type: 'Feature', created_by: 'Michael Scott', priority: 'High'},
]

const pages = [{number: "1", active: true}, {number: "2", active: false}]


const TicketsTable = (props) => {
  return(
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row>
          <Col className="my-auto">
            <h3 className="mb-0">Tickets</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Created By</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">{ticket.title}</span>
              </th>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
              <td>{ticket.created_by}</td>
              <td>{ticket.priority}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePagination pages={pages} />
    </Card>
  )
}

export default TicketsTable;