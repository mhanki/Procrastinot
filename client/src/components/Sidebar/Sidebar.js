import { useState } from "react";

// reactstrap components
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

const Sidebar = (props) => {
  const navInfo = [
    {name: 'Dashboard', icon: 'tv-2', link: '#'},
    {name: 'Projects', icon: 'folder-17', link: '#'},
    {name: 'Tickets', icon: 'bullet-list-67', link: '#'},
    {name: 'Profile', icon: 'single-02', link: '#'}
  ]
  const [collapseOpen, setCollapseOpen] = useState();

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
      style={{ maxWidth: '200px' }}
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse} >
          <span className="navbar-toggler-icon" />
        </button>

        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse} >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {/* Divider */}
          <hr className="my-3" />

          <Nav className="mb-md-3" navbar>
            {navInfo.map(item => (
              <NavItem>
                <NavLink href={item.link}>
                  <i className={`ni ni-${item.icon}`} style={{ color: '#5e72e4' }} />
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
