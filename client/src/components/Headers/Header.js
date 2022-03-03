import { Container } from "reactstrap";

const Header = ({heading}) => {
  return (
    <div 
      className="header pb-8 pt-5 pt-md-8" 
      style={{ background: 'linear-gradient(90deg, #7F53AC 0%, #647DEE 100%)' }}
    >
      <Container className="mt--5" fluid>
        <h1 style={{ color: 'white' }}>{heading}</h1>
      </Container>
    </div>
  );
};

export default Header;
