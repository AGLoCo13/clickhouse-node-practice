// src/layouts/DashboardLayout.js
import { useState, useEffect } from 'react';
import { Outlet, useLocation }  from 'react-router-dom';
import { Button }               from 'react-bootstrap';
import Sidebar                  from '../components/Sidebar';

export default function DashboardLayout () {
  /* ─────────────────────────────────── responsive helpers ─── */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((s) => !s);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ───────────────────────────── active view for “selected” fx ─── */
  const view = useLocation().pathname.split('/')[2]; // 'bitcoin-price', 'uk-property-sales', …

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className={isMobile ? '' : 'd-flex'} style={{ minHeight: '100vh' }}>
      {/* ─────────── desktop sidebar ─────────── */}
      {!isMobile && (
        <Sidebar view={view} isMobile={false} onHide={toggleMenu} />
      )}

      {/* ─────────── mobile header + off-canvas ─────────── */}
      {isMobile && (
        <>
          <header
            className="d-flex align-items-center bg-light border-bottom px-3"
            style={{ height: 56, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1040 }}
          >
            <Button variant="outline-primary" onClick={toggleMenu}>
              ☰
            </Button>
            <span className="ms-3 fw-bold">Dashboard</span>
          </header>

          <Sidebar
            view={view}
            isMobile
            show={showMenu}
            onHide={toggleMenu}
          />
        </>
      )}

      {/* ─────────── main content ─────────── */}
      <main
        className="flex-grow-1 p-3"
        style={{ paddingTop: isMobile ? 56 : undefined }}  /* push content below mobile header */
      >
        <Outlet />
      </main>
    </div>
  );
}
