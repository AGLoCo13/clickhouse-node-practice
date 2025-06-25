import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BTCChart from '../components/BTCChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Navbar, Offcanvas, Nav, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { view } = useParams();

  const [btcData, setBtcData] = useState([]);
  const [ukData, setUKData] = useState([]);
  const [from, setFrom] = useState('2016-01-01');
  const [to, setTo] = useState('2020-11-02');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const fetchBTC = async (start = from, end = to) => {
    try {
      const res = await axios.get(`http://localhost:3000/analytics/crypto/btc?from=${start}&to=${end}`);
      setBtcData(res.data);
    } catch (error) {
      console.error('BTC fetch failed:', error);
    }
  };

  const fetchUKSales = async () => {
    try {
      const res = await axios.get('http://localhost:3000/analytics/sales/year');
      setUKData(res.data);
    } catch (error) {
      console.error('UK sales fetch failed:', error);
    }
  };

  useEffect(() => {
    if (view === 'bitcoin-price') {
      fetchBTC();
    } else if (view === 'uk-property-sales') {
      fetchUKSales();
    }
  }, [view, from, to]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>

      {/* Mobile Navbar */}
      <Navbar bg="light" expand={false} className="d-md-none w-100">
        <Navbar.Brand className="ms-3">Menu</Navbar.Brand>
        <Button variant="outline-primary" className="me-3" onClick={toggleMenu}>☰</Button>

        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Button className="mb-2" variant={view === 'bitcoin-price' ? 'primary' : 'outline-primary'} onClick={() => { navigate('/dashboard/bitcoin-price'); toggleMenu(); }}>
                Bitcoin Avg Price
              </Button>
              <Button variant={view === 'uk-property-sales' ? 'success' : 'outline-success'} onClick={() => { navigate('/dashboard/uk-property-sales'); toggleMenu(); }}>
                UK Property Sales
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>

      {/* Desktop Sidebar */}
      <div className="d-none d-md-block" style={{ width: '220px', background: '#f8f9fa', padding: '20px', borderRight: '1px solid #dee2e6' }}>
        <h4>Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className={`btn btn-${view === 'bitcoin-price' ? 'primary' : 'outline-primary'} w-100`} onClick={() => navigate('/dashboard/bitcoin-price')}>
              Bitcoin Avg Price
            </button>
          </li>
          <li className="nav-item">
            <button className={`btn btn-${view === 'uk-property-sales' ? 'success' : 'outline-success'} w-100`} onClick={() => navigate('/dashboard/uk-property-sales')}>
              UK Property Sales
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Dashboard</h2>

        {view === 'bitcoin-price' && (
          <div>
            <h5>Bitcoin Average Price</h5>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Start Date</label>
                <input className="form-control" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label>End Date</label>
                <input className="form-control" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>

            {btcData.length > 0 && (
              <div className='d-flex justify-content-left'>
                <Card style={{ width: '100%', maxWidth: '900px' }}>
                  <Card.Header>Price Over Time</Card.Header>
                  <Card.Body>
                    <div style={{ width: '100%', height: 400 }}>
                      <BTCChart data={btcData} />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        )}

        {view === 'uk-property-sales' && (
          <div>
            <h5>Top UK Property Sales</h5>
            {ukData.length > 0 && (
              <div className='d-flex justify-content-left'>
                <Card style={{ width: '100%', maxWidth: '900px' }}>
                  <Card.Header>Average Property Prices by Year</Card.Header>
                  <Card.Body>
                    <div style={{ width: '100%', height: 400 }}>
                      <ResponsiveContainer>
                        <BarChart data={ukData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip formatter={(value) => `£${parseFloat(value).toLocaleString()}`} />
                          <Bar dataKey="avg_price" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
