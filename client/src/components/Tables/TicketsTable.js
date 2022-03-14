import React from "react";
import { 
  Card,
  Table
} from "reactstrap";
import TableHeader from './TableHeader/TableHeader';
import TablePagination from './TablePagination/TablePagination';
import OverflowMenu from '../OverflowMenu/OverflowMenu';

// Mock data
const pages = [{number: "1", active: true}, {number: "2", active: false}]

const TicketsTable = ({tickets}) => {
  return(
    <Card className="shadow">
      <TableHeader title="Tickets" button={true} buttonText="New Ticket" />

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Created By</th>
            <th scope="col">Priority</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <th scope="row">
                <span className="mb-0 text-sm">{ticket.title}</span>
              </th>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
              <td>{ticket.created_by}</td>
              <td>{ticket.priority}</td>
              <td>
                <OverflowMenu items={[{name: "Assign to me", onClick: (e) => e.preventDefault()}]} size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePagination pages={pages} />
    </Card>
  )
}

export default TicketsTable;