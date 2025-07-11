// src/pages/UkPropertySalesPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Container } from 'react-bootstrap';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

//Loading component for individual cards
const CardLoadingSpinner = ({ message = "Loading" }) => (
  <div className='d-flex flex-column align-items-center justify-content-center h-100'>
    <Spinner animation='border' variant='primary' className='mb-3' />
    <span className='text-muted small'>{message}</span>
  </div>
);

const UkPropertySalesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'http://localhost:3000/analytics/sales/year',
          { withCredentials: true }
        );
        setData(res.data);
      } catch (err) {
        setError('Could not load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      // width: '100vw',
      // maxWidth: '100vw',
      // margin: 0,
      // padding: '1.5rem',
      // boxSizing: 'border-box',
      // overflowX: 'hidden'
    }}>
      <Container fluid="xl" className='py-4' style={{ maxWidth: '1800px' }}>
        <Row className='align-items-end g-3 mb-4' style={{ margin: 0 }}>
          <Col xs={12} md={4} lg={3}>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                🏠
              </div>
              <div>
                <h2 className='mb-0 fw-bold text-dark'>Top UK Property Sales</h2>
                <p className='text-muted mb-0'>Analysis of average property prices over the years</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className='g-4 mb-4' style={{ margin: 0 }}>
          {/* ---------------- Recharts chart ------- */}
          <Col xl={8} lg={7} md={12}>
            <Card className='h-100 shadow-sm border-0'>
              <Card.Header className='text-white border-0' style={{
                backgroundColor: 'rgb(39, 48, 67)',
                padding: '1.25rem'
              }}>
                <h5 className='mb-0 fw-bold'>📊 Average Property Prices by Year</h5>
              </Card.Header>
              <Card.Body
                className="p-4"
                style={{
                  minHeight: '600px',
                  height: 'auto',
                  backgroundColor: '#fafbfc'
                }}
              >
                {loading && <CardLoadingSpinner />}

                {!loading && error && (
                  <div className='d-flex justify-content-center align-items-center h-100'>
                    <p className="text-danger m-0">{error}</p>
                  </div>
                )}

                {!loading && !error && data.length === 0 && (
                  <div className='d-flex justify-content-center align-items-center h-100'>
                    No data available.
                  </div>
                )}

                {!loading && !error && data.length > 0 && (
                  <div style={{ width: '100%', height: '520px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 30, right: 40, left: 40, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 11, fill: '#6c757d' }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={90}
                          axisLine={{ stroke: '#dee2e6' }}
                          tickLine={{ stroke: '#dee2e6' }}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#6c757d' }}
                          tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                          axisLine={{ stroke: '#dee2e6' }}
                          tickLine={{ stroke: '#dee2e6' }}
                        />
                        <Tooltip
                          formatter={(value) => [`£${parseFloat(value).toLocaleString()}`, 'Average Price']}
                          labelFormatter={(label) => `Year: ${label}`}
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #dee2e6',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar
                          dataKey="avg_price"
                          fill="url(#colorGradient)"
                          radius={[6, 6, 0, 0]}
                          stroke="#4CAF50"
                          strokeWidth={1}
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#66BB6A" />
                            <stop offset="100%" stopColor="#4CAF50" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Add a complementary column for additional info or stats */}
          <Col xl={4} lg={5} md={12}>
            <Card className='h-100 shadow-sm border-0'>
              <Card.Header className='text-white border-0' style={{
                backgroundColor: 'rgb(39, 48, 67)',
                padding: '1.25rem'
              }}>
                <h5 className='mb-0 fw-bold'>📈 Key Statistics</h5>
              </Card.Header>
              <Card.Body style={{
                padding: '1.5rem',
                backgroundColor: '#fafbfc',
                minHeight: '600px'
              }}>
                {!loading && !error && data.length > 0 && (
                  <div>
                    <div className="stat-item mb-4 p-3 bg-white rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stat-icon bg-primary text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          📅
                        </div>
                        <div>
                          <h6 className="mb-0 text-muted">Total Years</h6>
                          <h4 className="mb-0 fw-bold text-primary">{data.length}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="stat-item mb-4 p-3 bg-white rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stat-icon bg-success text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          📈
                        </div>
                        <div>
                          <h6 className="mb-0 text-muted">Highest Price</h6>
                          <h4 className="mb-0 fw-bold text-success">£{Math.max(...data.map(d => d.avg_price)).toLocaleString()}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="stat-item mb-4 p-3 bg-white rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stat-icon bg-info text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          📉
                        </div>
                        <div>
                          <h6 className="mb-0 text-muted">Lowest Price</h6>
                          <h4 className="mb-0 fw-bold text-info">£{Math.min(...data.map(d => d.avg_price)).toLocaleString()}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="stat-item mb-4 p-3 bg-white rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stat-icon bg-warning text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          💰
                        </div>
                        <div>
                          <h6 className="mb-0 text-muted">Average Price</h6>
                          <h4 className="mb-0 fw-bold text-warning">£{Math.round(data.reduce((sum, d) => sum + d.avg_price, 0) / data.length).toLocaleString()}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="stat-item p-3 bg-white rounded shadow-sm">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stat-icon bg-danger text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          📊
                        </div>
                        <div>
                          <h6 className="mb-0 text-muted">Price Range</h6>
                          <h4 className="mb-0 fw-bold text-danger">£{(Math.max(...data.map(d => d.avg_price)) - Math.min(...data.map(d => d.avg_price))).toLocaleString()}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UkPropertySalesPage;