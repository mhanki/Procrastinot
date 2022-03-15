import React from "react";
import {
  Card,
  Table,
} from "reactstrap";
import TableHeader from './TableHeader/TableHeader';
import TablePagination from './TablePagination/TablePagination';

// Mock data
const pages = [{ number: "1", active: true }, { number: "2", active: false }, { number: "3", active: false }]


const ProjectTable = ({ projects }) => {
  return (
    <Card className="shadow">
      <TableHeader title="Projects" button={true} buttonText="New Project" />

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <th scope="row">
                <span className="mb-0 text-sm">{project.title}</span>
              </th>
              <td>{project.description}</td>
              <td>{project.created_by}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePagination pages={pages} />
    </Card>
  )
}

export default ProjectTable;