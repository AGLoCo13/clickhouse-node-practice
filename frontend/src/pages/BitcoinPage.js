import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import BTCChart from '../components/BTCChart';
import DonutChart from '../components/DonutChart';
import HistChart from '../components/HistChart';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BitcoinPricePage = () => {
    const [lineData, setLineData] = useState([]);
    const [donutData, setDonutData] = useState([]);
    const [histData, setHistData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [from, setFrom] = useState('2016-01-01');
    const [to, setTo] = useState('2020-11-02');
    const navigate = useNavigate();

    // Helper for Dry axios calls
    const api = axios.create({
        baseURL: 'http://localhost:3000/analytics/crypto/btc',
        withCredentials: true,
    });
    //Fetching of Data
    useEffect(() => {
        (async () => {
            try {
                // 1) Line Chart - average daily price 
                const line = await api.get('/', { params: { from, to } });
                // 2)donut / top 10 max prices
                const donut = await api.get('/top-max', { params: { limit: 10 } });
                // 3) Histogram - montly count /avg / volume etc.. 
                //Backend returns [{bicket : '2017-01' , avg:1234}, ...]

                const hist = await api.get('/histogram', { params: { from, to, bucket: 'month' } })
                /* Set State */
                setLineData(line.data);
                setDonutData(donut.data);
                setHistData(hist.data);
            }catch(err) {
                console.error(err);
            }
            finally {setLoading(false);}
            
        })();
    }, [from, to]);


    return (
        <div className="container-fluid px-3 py-3">
      <Row className="align-items-end g-3 mb-4">
        <Col xs={12} md={4} lg={3}>
          <h4 className="mb-0">Bitcoin Stats</h4>
        </Col>

        <Col xs={6} md={3} lg={2}>
          <Form.Label className="small">Start</Form.Label>
          <Form.Control type="date" value={from} onChange={e => setFrom(e.target.value)} />
        </Col>

        <Col xs={6} md={3} lg={2}>
          <Form.Label className="small">End</Form.Label>
          <Form.Control type="date" value={to} onChange={e => setTo(e.target.value)} />
        </Col>
      </Row>

      {loading && (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      )}

      {!loading && (
        <>
          {/* ----------- line chart ----------- */}
          <Row className="g-3">
            <Col lg={7}>
              <Card>
                <Card.Header>Price Over Time</Card.Header>
                <Card.Body>{lineData.length > 0 && <BTCChart data={lineData} />}</Card.Body>
              </Card>
            </Col>

            {/* ----------- donut (top-10) ----------- */}
            <Col lg={5}>
              <Card>
                <Card.Header>Top 10 Daily Highs</Card.Header>
                <Card.Body>{donutData.length > 0 && (
                  <DonutChart data={donutData} dataKey="price" nameKey="date" />
                )}</Card.Body>
              </Card>
            </Col>

            {/* ----------- histogram ----------- */}
            <Col lg={12}>
              <Card>
                <Card.Header>Monthly Average Price</Card.Header>
                <Card.Body>{histData.length > 0 && (
                  <HistChart data={histData} xKey="bucket" yKey="avg_price" />
                )}</Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
    )
}

export default BitcoinPricePage;