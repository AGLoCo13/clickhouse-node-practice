// src/pages/UkPropertySalesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const UkPropertySalesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/analytics/sales/year')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h5>Top UK Property Sales</h5>
      <Row >
        <Col md={6} className='mb-2'>
          <Card>
            <Card.Header>Average Property Prices by Year</Card.Header>
            <Card.Body>
              {data.length > 0 && (
                <ResponsiveContainer height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={v => `£${parseFloat(v).toLocaleString()}`} />
                    <Bar dataKey="avg_price" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UkPropertySalesPage;
