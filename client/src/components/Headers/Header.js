import { Container } from "reactstrap";

const Header = ({heading}) => {
  return (
    <div 
      className="header pb-8 pt-5 pt-md-8" >
      <Container className="mt--5" fluid>
        <h1>{heading}</h1>
      </Container>
    </div>
  )
};

export default Header;
