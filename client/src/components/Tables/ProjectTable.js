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
const projects = [
  {title: 'Selenite', description: 'Minimalistic Spotify Player', created_by: 'Michael Scott'},
  {title: 'Zen Focus', description: 'Pomodoro timer with meditation based breaks', created_by: 'Michael Scott'},
  {title: 'Issue Tracker', description: 'Project management app for tracking tasks', created_by: 'Dwight Schrute'}
]

const pages = [{number: "1", active: true}, {number: "2", active: false}, {number: "3", active: false}]


const ProjectTable = (props) => {
  return(
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row>
          <Col className="my-auto">
            <h3 className="mb-0">Projects</h3>
          </Col>
          <Col className="text-md-right">
            <button className="btn btn-primary">New Project</button>
          </Col>
        </Row>
      </CardHeader>

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
            <tr>
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