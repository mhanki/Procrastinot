import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const Sidebar = () => {
  const navInfo = [
    { name: 'Dashboard', icon: 'tv-2', link: '#' },
    { name: 'Projects', icon: 'folder-17', link: '#' },
    { name: 'Tickets', icon: 'bullet-list-67', link: '#' },
    { name: 'Profile', icon: 'single-02', link: '#' }
  ]
  const [collapseOpen, setCollapseOpen] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  return (
    <Navbar
      id="sidenav-main"
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
    >
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse} >
          <span className="navbar-toggler-icon" />
        </button>

        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse} >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          <hr className="my-3" />

          <Nav className="mb-md-3" navbar>
            {navInfo.map(item => (
              <NavItem key={item.name}>
                <NavLink href={item.link}>
                  <i className={`ni ni-${item.icon}`} />
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
