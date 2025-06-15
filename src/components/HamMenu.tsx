'use client';

import React, { useState } from 'react';
import styles from './HamMenu.module.css';

interface HamMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navTabs = [
  { label: 'Marketwatch' },
  {
    label: 'Portfolio',
    children: ['Holdings', 'Positions', 'P&L Summary'],
  },
  {
    label: 'Funds',
    children: ['Add Funds', 'Withdraw', 'Fund History'],
  },
  { label: 'Orders' },
  { label: 'Reports' },
  { label: 'Settings' },
];

const HamMenu: React.FC<HamMenuProps> = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <div className={styles.close} onClick={onClose}>×</div>
          <div className={styles.profile}>👤</div>
          <div className={styles.loginText}>LK</div>
          <div className={styles.icons}>
            <div>🔍</div>
            <div>🤍</div>
            <div>🛒</div>
          </div>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navTitle}>LOOK FOR</div>
          {navTabs.map((tab) => (
            <div key={tab.label} className={styles.navItem}>
              <div className={styles.navMain} onClick={() => tab.children && toggleDropdown(tab.label)}>
                <div className={styles.label}>{tab.label}</div>
                {tab.children && <div className={styles.icon}>{openDropdown === tab.label ? '▲' : '▼'}</div>}
              </div>

              {tab.children && (
                <div
                  className={`${styles.dropdown} ${
                    openDropdown === tab.label ? styles.open : ''
                  }`}
                >
                  {tab.children.map((child) => (
                    <div key={child} className={styles.dropdownItem}>
                      {child}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HamMenu;
