import React, { useEffect,useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useMediaQuery } from 'react-responsive'
import Modal from 'react-bootstrap/Modal';
 
 import { Link } from 'react-router-dom';



const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 501 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 500 })
  return isMobile ? children : null
}



  function Main({fetchMovies, handleChange, searchKey}) {
    const [lgShow, setLgShow] = useState(false);
  
    return(
<>
<Desktop>
      <Navbar className=" navigation text-light"  expand="lg">
      <Container fluid>
        <Link to='/' className=" navbar-brand text-white" >Dream<strong><span className='brand-color'>Cinemas</span></strong></Link>
         <Nav
            className="mx-auto ms-10 my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
<Link to="/" className="nav-link text-light">Get Tickets</Link>            
            
          </Nav>
          <Form className="d-flex" onSubmit={fetchMovies}>
            <Form.Control
onChange={handleChange}
             type="search"
              placeholder="Search Movies"
              className="me-0 search"
              aria-label="Search"
              value={searchKey}
            />
            <button type="submit" className='search-button'>
          <FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} />
          </button>
          </Form>
      </Container>
    </Navbar>
    </Desktop>


  <Mobile>
  <Navbar className=" text-light navigation mobile-navbar py-1"  expand="lg">
      <Container fluid className="">
      <Link to='/' className=" navbar-brand text-white" >Dream<strong><span className='brand-color'>Cinemas</span></strong></Link>
         <Nav
            className="mx-auto my-0 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
<Link to="/" className=" nav-link text-light fs-25">Get Tickets</Link>            
            
            </Nav>
  
      
      <button  onClick={() => setLgShow(true)} className='mobile-search-button'>
          <FontAwesomeIcon className='text-light mobile-icon' icon={faMagnifyingGlass} />
          </button>
      
      <Modal
      className=''
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title bg='dark' id="example-modal-sizes-title-lg">
            Search Movies
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="d-flex" onSubmit={fetchMovies}>
            <Form.Control
              type="search"
              onChange={handleChange}
                            placeholder="Search Movies"
              className="me-0 search-mobile"
              value={searchKey}
              aria-label="Search"
            />
            <button type='submit ' onClick={() => setLgShow(false)} className='search-button px-0 py-0'>
          <FontAwesomeIcon className='text-dark icon-mobile' icon={faMagnifyingGlass} />
          </button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </Navbar>
  </Mobile>
    </>

      )
  }
  export default Main;
