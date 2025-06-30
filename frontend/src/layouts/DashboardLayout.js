// src/layouts/DashboardLayout.js
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);


  //figure-out which view is active , pass to the sidebar
  const pathParts = useLocation().pathname.split('/');
  const view = pathParts[2];

  return (
    <div className={!isMobile ? "d-flex" : ""} style={{ minHeight: '100vh' }}>
      {/*Desktop Sidebar*/}
      {!isMobile ? (
        <Sidebar view={view} show={showMenu} onHide={toggleMenu} isMobile={false} />
      )
        :
        <>
          {/* Mobile offCanvas Sidebar */}
          <Sidebar
            view={view}
            show={showMenu}
            onHide={toggleMenu}
            isMobile />
        </>
      }

      {/* Main Content */}
      <div className='flex-grow-1 p-3' style={{ paddingTop: isMobile ? '56px' : undefined }}>
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
