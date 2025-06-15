import styles from './orderCard.module.css';
import React, { useState } from 'react';

type OrderCardProps = {
  time: string;
  client: string;
  ticker: string;
  side: string;
  product: string;
  qty: string;
  price: string;
  onDelete: () => void;
};

export default function OrderCard(props: OrderCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    props.onDelete();
    setShowMenu(false);
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span>{props.time}</span>
        <span
          className={styles.actions}
          onClick={() => setShowMenu(!showMenu)}
        >
          ...
        </span>
        {showMenu && (
          <div className={styles.menu}>
            <span onClick={handleDelete}>Delete</span>
          </div>
        )}
      </div>
      <div className={styles.tickerRow}>
        <span className={styles.ticker}>{props.ticker}</span>
      </div>
      <div className={styles.detailRow}>
        {props.side} • {props.product}
      </div>
      <div className={styles.detailRow}>Qty: {props.qty}</div>
      <div className={styles.priceRow}>
        <span>{props.price}</span>
        <span>{props.client}</span>
      </div>
    </div>
  );
}