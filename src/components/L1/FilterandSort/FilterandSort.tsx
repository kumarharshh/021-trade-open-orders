'use client';

import React, { useState } from 'react';
import styles from './filterAndSort.module.css';

interface FilterAndSortProps {
  columns?: string[];
  onSort?: (key: string, order: string) => void;
  onFilter?: (filter: { side?: string; product?: string }) => void;
  sideOptions: string[];
  productOptions: string[];
  onClose?: () => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({
  columns,
  sideOptions,
  productOptions,
  onSort,
  onFilter,
  onClose
}) => {

  const [side, setSide] = useState('');
  const [product, setProduct] = useState('');
  const [sort, setSort] = useState<{ key: string; order: string } | null>(null);
  const [showSideFilters, setShowSideFilters] = useState(false);
  const [showProductFilters, setShowProductFilters] = useState(false);

  const handleSort = (key: string, order: string) => {
    setSort({ key, order });
    onSort?.(key, order);
    onClose?.();
  }

  const handleApplyFilters = () => {
    onFilter?.({ side, product });
    if (sort) {
      onSort?.(sort.key, sort.order);
    }
    onClose?.();
  };

  return (
    <div className={styles.container}>
      {columns?.map((col) => (
        <div key={col} className={styles.row}>
          <span className={styles.columnName}>{col}</span>
          <div className={styles.actions}>
            {col === 'Side' ? (
              <span className={styles.filter} onClick={() => setShowSideFilters(!showSideFilters)}>🔍</span>
            ) : col === 'Product' ? (
              <span className={styles.filter} onClick={() => setShowProductFilters(!showProductFilters)}>🔍</span>
            ) : null}
            {col !== 'Side' && (
              <div className={styles.sortActions}>
                <span className={styles.sort} onClick={() => handleSort(col, 'asc')}>↑</span>
                <span className={styles.sort} onClick={() => handleSort(col, 'desc')}>↓</span>
              </div>
            )}
          </div>
        </div>
      ))}
      {(showSideFilters || showProductFilters) && (
        <div className={styles.filters}>
          {showSideFilters && (
            <div className={styles.dropdownRow}>
              <label htmlFor="side">Side:</label>
              <select
                id="side"
                className={styles.select}
                onChange={(e) => setSide(e.target.value)}
                defaultValue="All"
              >
                <option value="">All</option>
                {sideOptions.map(side => (
                  <option key={side} value={side}>{side}</option>
                ))}
              </select>
            </div>
          )}
          {showProductFilters && (
            <div className={styles.dropdownRow}>
              <label htmlFor="product">Product:</label>
              <select
                id="product"
                className={styles.select}
                onChange={(e) => setProduct(e.target.value)}
                defaultValue="All"
              >
                <option value="">All</option>
                {productOptions.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      <div className={styles.actions}>
        <button className={styles.applyButton} onClick={handleApplyFilters}>
          Apply Filters
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterAndSort;