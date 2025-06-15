'use client';

import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
import FilterAndSort from '../FilterandSort';
import OrderCard from '../OrderCard';
import ErrorComponent from '../ErrorComponent';
import styles from './OpenOrders.module.css';
import Pagination from '../Pagination';

interface OrderCardProps {
  time: string;
  client: string;
  ticker: string;
  side: string;
  product: string;
  qty: string;
  price: string;
  total: string;
}

const dummyOrders: OrderCardProps[] = [
  {
    time: '08:14:38',
    client: 'AAA001',
    ticker: 'RELIANCE',
    side: 'Buy',
    product: 'CNC',
    qty: '50/100',
    price: '250.50',
    total: '₹12,525.00'
  },
  {
    time: '08:14:32',
    client: 'AAA003',
    ticker: 'MRF',
    side: 'Buy',
    product: 'NRML',
    qty: '10/20',
    price: '2,700.00',
    total: '₹27,000.00'
  },
  {
    time: '08:14:35',
    client: 'AAA002',
    ticker: 'ASIANPAINT',
    side: 'Buy',
    product: 'NRML',
    qty: '10/30',
    price: '1,500.60',
    total: '₹15,006.00'
  },
  {
    time: '08:14:36',
    client: 'AAA002',
    ticker: 'TATAINVEST',
    side: 'Sell',
    product: 'INTRADAY',
    qty: '10/10',
    price: '2,300.10',
    total: '₹23,001.00'
  },
  {
    time: '08:14:56',
    client: 'AAA002',
    ticker: 'ASIANPAINT',
    side: 'Sell',
    product: 'NRML',
    qty: '10/30',
    price: '1,500.60',
    total: '₹15,006.00'
  }
];

const columns: string[] = ['Time', 'Client', 'Side', 'Product', 'Qty', 'Price'];

const sideOptions = Array.from(new Set(dummyOrders.map(order => order.side)));
const productOptions = Array.from(new Set(dummyOrders.map(order => order.product)));

const OpenOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderCardProps[]>(dummyOrders);
  const [tags, setTags] = useState<string[]>([]);
  const [clientTags, setClientTags] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [sideFilter, setSideFilter] = useState<string | null>(null);
  const [productFilter, setProductFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<{ key: string; order: string } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const handleAddTag = (tag: string) => {
    const formatted = tag.trim().toUpperCase();
    if (formatted.startsWith('AAA')){
      if (!tags.includes(formatted)) {
        setClientTags(prev => [...prev, formatted]);
      }
    } else {
      setTags(prev => [...prev, formatted]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (tag.startsWith('AAA')) {
      setClientTags(prev => prev.filter(t => t !== tag));
    }
    else {
      setTags(prev => prev.filter(t => t !== tag));
    }
  };

  const handleSort = (key: string, order: string) => {
    const sorted = [...orders].sort((a, b) => {
      const valA = a[key.toLowerCase() as keyof OrderCardProps];
      const valB = b[key.toLowerCase() as keyof OrderCardProps];

      if (key === 'Time') {
        const [h1, m1, s1] = a.time.split(':').map(Number);
        const [h2, m2, s2] = b.time.split(':').map(Number);
        const t1 = h1 * 3600 + m1 * 60 + s1;
        const t2 = h2 * 3600 + m2 * 60 + s2;

        return order === 'asc' ? t1 - t2 : t2 - t1;
      }

      if(key === 'Qty') {
        const qtyA = parseInt(a.qty.split('/')[0], 10);
        const qtyB = parseInt(b.qty.split('/')[0], 10);

        return order === 'asc' ? qtyA - qtyB : qtyB - qtyA;
      }

      if(key === 'Price' || key === 'Total') {
        const priceA = parseInt(a.price.replace(/[^0-9.-]+/g, ''), 10);
        const priceB = parseInt(b.price.replace(/[^0-9.-]+/g, ''), 10);
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    setOrders(sorted);
    setSortKey({ key, order });
  };

  const handleRemoveSort = () =>{
    setSortKey(null);
    setOrders(dummyOrders); 
  }

  const handleFilter = (filter: { side?: string; product?: string }) => {
    if(filter.side) {
      setSideFilter(filter.side);
    }
    if(filter.product) {
      setProductFilter(filter.product);
    }
  };

  const filteredOrders = orders.filter(order => {
    const tickerMatch =
        tags.length === 0 || tags.some(tag => order.ticker.toUpperCase().includes(tag));
    const clientMatch =
        clientTags.length === 0 || clientTags.some(tag => order.client.toUpperCase().includes(tag));
    const sideMatch = sideFilter ? order.side === sideFilter : true;
    const productMatch = productFilter ? order.product === productFilter : true;
    
    return tickerMatch && clientMatch && sideMatch && productMatch;    
  });

  const handleDownload = () => {
  const data = filteredOrders;
  if (data.length > 0) {
    const fileName = 'orders.json';
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  } else {
    alert('No data available to download');
  }
};

  const handleDeleteOrder = (orderToDelete: OrderCardProps) => {
    setOrders(prevOrders => prevOrders.filter(order => order !== orderToDelete));
    setTags(prevTags => prevTags.filter(tag => !orderToDelete.ticker.toUpperCase().includes(tag)));
    setClientTags(prevClientTags => prevClientTags.filter(tag => !orderToDelete.client.toUpperCase().includes(tag)));
  }

  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Open Orders</h1>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L12 15M12 15L9 12M12 15L15 12M21 19H3C2.44772 19 2 18.5523 2 18V6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <SearchBar onAddTag={handleAddTag} />

      <div className={styles.tagsWrapper}>
        {tags.map(tag => (
          <div key={tag} className={styles.tag}>
            {tag}
            <span className={styles.closeButton} onClick={() => handleRemoveTag(tag)}>×</span>
          </div>
        ))}
        {clientTags.map(tag => (
          <div key={tag} className={styles.tag}>
            {tag}
            <span className={styles.closeButton} onClick={() => handleRemoveTag(tag)}>×</span>
          </div>
        ))}
        {sideFilter && (
          <div className={styles.tag}>
            {sideFilter}
            <span className={styles.closeButton} onClick={() => setSideFilter(null)}>×</span>
          </div>
        )}
        {productFilter && (
          <div className={styles.tag}>
            {productFilter}
            <span className={styles.closeButton} onClick={() => setProductFilter(null)}>×</span>
          </div>
        )}
        {sortKey && (
          <div className={styles.tag}>
            {`${sortKey.key} (${sortKey.order})`}
            <span className={styles.closeButton} onClick={() => handleRemoveSort()}>×</span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.filterButton} onClick={() => setShowModal(true)}>
          Filter & Sort
        </button>

        <button className={styles.clearButton} onClick={() => {
          setTags([]);
          setSideFilter(null);
          setProductFilter(null);
          setSortKey(null);
          setOrders(dummyOrders);
        }}>
          Clear All Filters
        </button>
      </div>

      <div className={styles.cardsWrapper}>
        {filteredOrders.length === 0 ? (
          <ErrorComponent message="No products available for the applied filter" />
        ) : (
          currentOrders.length === 0 ? (
            <ErrorComponent message="No products available for the current page" />
          ) : (
            currentOrders.map((order, idx) => (
              <OrderCard key={idx} {...order} onDelete={() => handleDeleteOrder(order)} />
            ))
          )
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          ordersPerPage={ordersPerPage}
          totalOrders={filteredOrders.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FilterAndSort
          columns={columns}
          onSort={handleSort}
          onFilter={handleFilter}
          sideOptions={sideOptions}
          productOptions={productOptions}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default OpenOrders;
