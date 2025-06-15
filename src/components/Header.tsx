'use client';
import React, { useState } from 'react';
import styles from './header.module.css';
import HamMenu from './HamMenu';

const Header = () => {
  const [open, setOpen] = useState(false);

  const marketData = [
    { name: 'NIFTY', value: '52,323.30' },
    { name: 'NIFTY50', value: '25,255.75' },
    { name: 'RELCHEMQ', value: '162.73' }
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
            <div className={styles.menuIcon} onClick={() => setOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21M3 12H21M3 18H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
          <div className={styles.logo}>021.T</div>
          <div className={styles.marketData}>
            {marketData.map((item) => (
              <div key={item.name} className={styles.marketItem}>
                <div className={styles.marketName}>{item.name}</div>
                <div className={styles.marketValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <nav className={styles.navLinks}>
          <span>MARKETWATCH</span>
          <span>EXCHANGE FILES</span>
          <span>PORTFOLIO ▾</span>
          <span>FUNDS ▾</span>
        </nav>
      </header>
      <HamMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
