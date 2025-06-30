import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col , Button,Form} from 'react-bootstrap';
import BTCChart from '../components/BTCChart';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BitcoinPricePage = () => {
    const [data, setData] = useState([]);
    const [from, setFrom] = useState('2016-01-01');
    const [to, setTo] = useState('2020-11-02');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/analytics/crypto/btc?from=${from}&to=${to}`,{
                withCredentials: true,
            })
            .then(res => setData(res.data))
            .catch(console.error);
    }, [from, to]);


    return (
        <div className='container-fluid px-3 py-3'>
            {/* Header Row */}
            <Row className='align-items-center justify-content-between mb-4'>
                <Col md="auto">
                    <h5>Bitcoin Average Price</h5>
                </Col>
                <Col md="auto">
                    <Form className="d-flex flex-wrap align-items-center gap-2">
                        <Form.Group controlId="startDate">
                            <Form.Label className="mb-0">Start Date</Form.Label>
                            <Form.Control type="date" value={from} onChange={e => setFrom(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label className="mb-0">End Date</Form.Label>
                            <Form.Control type="date" value={to} onChange={e => setTo(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Col>
                </Row>
                    {/*Chart Row */}
                <Row >
                    <Col md={6} className='mb-2'>
                        <Card >
                            <Card.Header>Price Over Time</Card.Header>
                            <Card.Body>
                                {data.length > 0 && (
                                    <BTCChart data={data} />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>



        </div>
    )
}

export default BitcoinPricePage;