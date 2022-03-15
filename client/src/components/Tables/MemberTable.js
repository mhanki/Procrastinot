import React from "react";
import {
  Card,
  Table,
} from "reactstrap";
import TableHeader from './TableHeader/TableHeader';
import TablePagination from './TablePagination/TablePagination';

// Mock data
const pages = [{ number: "1", active: true }]

const MemberTable = ({ members }) => {
  return (
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
          {members.map(({ user }) => (
            <tr key={user.name}>
              <td>
                <span className="text-sm">{user.name}</span>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePagination pages={pages} />
    </Card>
  )
}

export default MemberTable;