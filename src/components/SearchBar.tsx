'use client';

import React, { useState } from 'react';
import styles from './searchBar.module.css';

interface SearchBarProps {
  onAddTag: (tag: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddTag }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onAddTag(input.trim().toUpperCase());
      setInput('');
    }
  };

  return (
    <input
      id='searchBar'
      type="text"
      className={styles.searchInput}
      placeholder="Search for a stock or clientID"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchBar;
