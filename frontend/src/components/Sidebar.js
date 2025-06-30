import React from 'react';
import { Button, Nav, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ view, show, onHide, isMobile }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const Menu = (
    <Nav className="flex-column">
      <Button
        className="mb-2"
        variant={view === 'bitcoin-price' ? 'primary' : 'outline-primary'}
        onClick={() => {
          navigate('/dashboard/bitcoin-price');
          if (isMobile) onHide();
        }}
      >
        Bitcoin Avg Price
      </Button>
      <Button
        variant={view === 'uk-property-sales' ? 'success' : 'outline-success'}
        onClick={() => {
          navigate('/dashboard/uk-property-sales');
          if (isMobile) onHide();
        }}
      >
        UK Property Sales
      </Button>
    </Nav>
  );

  if (isMobile) {
    return (
      <>
        <div className='d-flex justify-content-end'>
          <Button
            onClick={onHide}
          >Menu</Button>
        </div>
        <Offcanvas show={show} onHide={onHide} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='d-flex flex-column justify-content-between h-100'>
            {Menu}
            <div className="d-flex justify-content-center align-items-center my-4">
              <Button className="md-2" variant="danger" onClick={logout}>
                Logout
              </Button>
            </div> 
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  return (
    <div
      style={{
        width: '220px',
        background: '#f8f9fa',
        padding: '20px',
        borderRight: '1px solid #dee2e6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
      }}
    >
      <div>
        <h4>Menu</h4>
        {Menu}
      </div>
      {/*Bottom-right aligned logout */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
