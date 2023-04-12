import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import {ReactComponent as NavLogo} from './NavBrand.svg';
import { useEffect } from 'react';
import './HeaderNav.css';



export default function HeaderNav({dimension}) {
    const [navHeight, setNavHeight] = dimension;
    useEffect(()=>{
        const navbar = document.querySelector('.navbar');
        const height = navbar.offsetHeight;
        setNavHeight(height);
      }, []);

  return (
    <Navbar bg="dark" variant="dark" fixed='top'>
      <Container fluid>
        <Navbar.Brand href="#ID_ADD_TASK">
            <NavLogo className='nav-logo'/>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Button variant="primary">Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
