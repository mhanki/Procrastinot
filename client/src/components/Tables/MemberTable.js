import React from "react";
import { 
  Card,
  Table,
} from "reactstrap";
import TableHeader from './TableHeader/TableHeader';
import TablePagination from './TablePagination/TablePagination';

// Mock data
const pages = [{number: "1", active: true}]

const MemberTable = ({members}) => {
  return(
    <Card className="shadow">
      <TableHeader title="Team" />

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.name}>
              <td>
                <span className="text-sm">{member.name}</span>
              </td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePagination pages={pages} />
    </Card>
  )
}

export default MemberTable;