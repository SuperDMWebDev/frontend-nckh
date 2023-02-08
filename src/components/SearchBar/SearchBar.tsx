import React, { useState, useRef } from 'react';
import './SearchBar.css';
// import { MdClose } from 'react-icons/md';

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener('load', () => inputRef.current?.focus());

  const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setKeyword(searchWord);

    console.log('filter');
  };

  const clearInput = (): void => {
    setKeyword('');
    inputRef.current?.focus();
  };

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Enter keywords ..."
          value={keyword}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {/* {keyword.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />} */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
