import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Spinner ,Container} from 'react-bootstrap';
import BTCChart from '../components/BTCChart';
import DonutChart from '../components/DonutChart';
import HistChart from '../components/HistChart';
import { FaBitcoin } from 'react-icons/fa';

//Loading component for individual cards
const CardLoadingSpinner = ({ message = "Loading..." }) => (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <Spinner animation='border' variant="primary" className="mb-3" />
        <span className='text-muted small'>{message}</span>
    </div>
);

const BitcoinPricePage = () => {
    const [lineData, setLineData] = useState([]);
    const [donutData, setDonutData] = useState([]);
    const [histData, setHistData] = useState([]);


    //Individual loading states for each chart
    const [lineLoading, setLineLoading] = useState(true);
    const [donutLoading, setDonutLoading] = useState(true);
    const [histLoading, setHistLoading] = useState(true);

    const [from, setFrom] = useState('2016-01-01');
    const [to, setTo] = useState('2020-11-02');

    // Helper for Dry axios calls
    const api = axios.create({
        baseURL: 'http://localhost:3000/analytics/crypto/btc',
        withCredentials: true,
    });

    // Fetch individual chart data
    const fetchLineData = async () => {
        try {
            setLineLoading(true);
            const line = await api.get('/', { params: { from, to } });
            setLineData(line.data);
        } catch (err) {
            console.error('Error fetching line data:', err);
            setLineData([]); // Reset on error
        } finally {
            setLineLoading(false);
        }
    };

    const fetchDonutData = async () => {
        try {
            setDonutLoading(true);
            const donut = await api.get('/top-max', { params: { limit: 10 } });
            setDonutData(donut.data);
        } catch (err) {
            console.error('Error fetching donut data:', err);
            setDonutData([]); // Reset on error
        } finally {
            setDonutLoading(false);
        }
    };

    const fetchHistData = async () => {
        try {
            setHistLoading(true);
            const hist = await api.get('/histogram', { params: { from, to, bucket: 'month' } });
            setHistData(hist.data);
        } catch (err) {
            console.error('Error fetching histogram data:', err);
            setHistData([]); // Reset on error
        } finally {
            setHistLoading(false);
        }
    };

    // Fetch all data when component mounts or dates change
    useEffect(() => {
        // Fetch all charts concurrently
        Promise.all([
            fetchLineData(),
            fetchDonutData(),
            fetchHistData()
        ]);
    }, [from, to]);

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
        }}>
            <Container fluid="xl" className='py-4' style={{maxWidth: '1800px'}}>
            {/* <div className="container-fluid px-3 py-3"> */}
            <Row className="align-items-end g-3 mb-4" style={{ margin: 0 }}>
                <Col xs={12} md={4} lg={3}>
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                            <FaBitcoin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className='mb-0 fw-bold text-dark'>Bitcoin Statistics</h2>
                            <p className='text-muted mb-0'>Analysis of Bitcoin prices over time</p>
                        </div>
                    </div>
                </Col>

                <Col xs={6} md={3} lg={2}>
                    <Form.Label className="small">Start</Form.Label>
                    <Form.Control
                        type="date"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                    />
                </Col>

                <Col xs={6} md={3} lg={2}>
                    <Form.Label className="small">End</Form.Label>
                    <Form.Control
                        type="date"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="g-3 mb-4" style={{ margin: 0 }}>
                {/* ----------- line chart ----------- */}
                <Col lg={7}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="text-white border-0" style={{
                            backgroundColor: 'rgb(39, 48, 67)',
                            padding: '1.25rem'
                        }}>
                            <h6 className="mb-0 text-white fw-semibold">Price Over Time</h6>
                        </Card.Header>
                        <Card.Body
                            className="p-4"
                            style={{
                                height: '420px',
                                backgroundColor: '#fafbfc'
                            }}
                        >
                            {lineLoading ? (
                                <CardLoadingSpinner message="Loading price data..." />
                            ) : lineData.length > 0 ? (
                                <div className="p-3 h-100">
                                    <BTCChart data={lineData} />
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                    <div className="text-center">
                                        <i className="bi bi-exclamation-circle fs-1 mb-2"></i>
                                        <p className="mb-0">No price data available for the selected date range.</p>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* ----------- donut (top-10) ----------- */}
                <Col lg={5}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="text-white border-0" style={{
                            backgroundColor: 'rgb(39, 48, 67)',
                            padding: '1.25rem'
                        }}>
                            <h6 className="mb-0 text-white fw-semibold">Top 10 Daily Highs</h6>
                        </Card.Header>
                        <Card.Body
                            className="d-flex flex-column p-0"
                            style={{
                                height: '420px',
                                backgroundColor: '#fafbfc'
                            }}
                        >
                            {donutLoading ? (
                                <CardLoadingSpinner message="Loading top highs..." />
                            ) : donutData.length > 0 ? (
                                <div className="p-3 h-100">
                                    <DonutChart data={donutData} dataKey="price" nameKey="date" />
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                    <div className="text-center">
                                        <i className="bi bi-exclamation-circle fs-1 mb-2"></i>
                                        <p className="mb-0">No high price data available.</p>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* ----------- histogram ----------- */}
                <Col lg={12}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="text-white border-0"
                            style={{
                                backgroundColor: 'rgb(39, 48, 67)',
                                padding: '1.25rem'
                            }}>
                            <h6 className="mb-0 fw-semibold">Monthly Average Price</h6>
                        </Card.Header>
                        <Card.Body
                            className="d-flex flex-column p-0"
                            style={{ height: '420px' }}
                        >
                            {histLoading ? (
                                <CardLoadingSpinner message="Loading monthly averages..." />
                            ) : histData.length > 0 ? (
                                <div className="p-3 h-100">
                                    <HistChart data={histData} xKey="bucket" yKey="avg_price" />
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                    <div className="text-center">
                                        <i className="bi bi-exclamation-circle fs-1 mb-2"></i>
                                        <p className="mb-0">No monthly data available for the selected date range.</p>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div >
    );
};

export default BitcoinPricePage;