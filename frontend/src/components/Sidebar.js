// src/components/Sidebar.js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import {
  MdHome,
  MdTimeline,
  MdLogout,

} from 'react-icons/md';
import {
  FaBitcoin,
  FaDollarSign
} from 'react-icons/fa';

import { AuthContext } from '../context/AuthContext';
import cls from './Sidebar.module.css';


/*  Central nav definition – add / remove items here */
const menu = [
  {
    label: 'Home',
    icon: <MdHome />,
    path: '/dashboard/bitcoin-price',
  },
  {
    label: 'Analysis',
    icon: <MdTimeline />,
    path: '/dashboard/analysis',       // ← still used for highlight logic
    children: [
      {
        label: 'Bitcoin Prices',
        path: '/dashboard/bitcoin-price',
        icon: <FaBitcoin />
      },
      {
        label: 'UK Property Sales',
        path: '/dashboard/uk-property-sales',
        icon: <FaDollarSign />
      },
    ],
  },
];


/*  Sidebar component                                                         */

export default function Sidebar({ view, show, onHide, isMobile }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ----------------------------- nav rendering ---------------------------- */
  const NavLinks = (
    <nav className={cls.navCol} >
      {menu.map((item, i) => {
        const active = view && item.path.includes(view);

        return (
          <div key={i}>
            {/* -------------------- top-level link -------------------- */}
            <button
              className={`${cls.navBtn} ${active ? cls.active : ''}`}
              onClick={() => {
                // Navigate immediately if the item has no children
                if (!item.children) {
                  navigate(item.path);
                  if (isMobile) onHide();
                }
              }}
            >
              <span className={cls.icon}>{item.icon}</span>
              {item.label}
            </button>

            {/* -------------------- child links ---------------------- */}
            {item.children && (
              <div className={cls.subMenu}>
                {item.children.map((child, j) => (
                  <button
                    key={j}
                    className={cls.subBtn}
                    onClick={() => {
                      navigate(child.path);
                      if (isMobile) onHide();
                    }}
                  >
                    <>
                      <span className="me-2">{child.icon}</span>
                      {child.label}
                    </>

                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* ------------------------- logout -------------------------- */}
      <div className="mt-auto d-flex justify-content-center py-3">
      <button className={`${cls.navBtn} ${cls.logout}`} onClick={logout}>
        <span className={cls.icon}><MdLogout /></span>Logout
      </button>
      </div>
    </nav>
  );

  /* --------------------------- mobile canvas ----------------------------- */
  if (isMobile) {
    return (
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="start"
        className={cls.canvas}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{NavLinks}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  /* --------------------------- desktop aside ----------------------------- */
  return <aside 
  className={cls.sidebar}
  style={{height:'100vh',width: '220px',position:'relative'}}

  >{NavLinks}</aside>;
}
