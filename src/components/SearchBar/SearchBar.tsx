import React, { useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import StyledSearchBar from './StyledSearchBar';

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
    <StyledSearchBar>
      <div className="search--input">
        <input
          type="search"
<<<<<<< HEAD
          placeholder="Search by name or keyword"
=======
          placeholder="Tìm kiếm bằng tên hoặc từ khóa"
>>>>>>> origin/develop
          value={keyword}
          onChange={handleFilter}
          ref={inputRef}
        />
        <div className="search__icon">
          {keyword.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />}
        </div>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
