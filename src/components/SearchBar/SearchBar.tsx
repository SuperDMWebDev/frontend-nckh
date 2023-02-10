import React, { useState, useRef } from 'react';
import './SearchBar.scss';
import { MdClose } from 'react-icons/md';

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener('load', () => inputRef.current?.focus());

  const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setKeyword(searchWord);
  };

  const clearInput = (): void => {
    setKeyword('');
    inputRef.current?.focus();
  };

  return (
    <div className="searchInputs">
      <input
        type="search"
        placeholder="Search by name or keyword"
        value={keyword}
        onChange={handleFilter}
        ref={inputRef}
      />
      <div className="searchIcon">
        {keyword.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />}
      </div>
    </div>
  );
};

export default SearchBar;
