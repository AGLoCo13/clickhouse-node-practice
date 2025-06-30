// src/pages/Login.js
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Alert, Button, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);   // ← uses the context helper
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);            // ← talks to /auth/login
      navigate('/dashboard/bitcoin-price');    // default landing page
    } catch (err) {
      setError('Invalid e-mail / password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card style={{ minWidth: 300 }}>
        <Card.Header className="text-center fw-bold">Login</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="form-control mb-4"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-100"
              disabled={loading}
              variant="primary"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Signing in…
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
