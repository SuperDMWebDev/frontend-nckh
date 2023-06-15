import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_OPTION } from '../../../constants/constant';

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>('');
  const [openOption, setOpenOption] = useState(false);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTION[0]);
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  let optionRef = useRef<HTMLDivElement>(null);

  const goToSearchPage = () => {
    navigate('/search', { state: { searchInput, searchOption } });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      goToSearchPage();
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (optionRef.current !== null) {
        if (!optionRef.current.contains(e.target)) {
          setOpenOption(false);
        }
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <Styled>
      <div className="searchContainer">
        <div className="searchText">
          <div
            className={`searchIcon ${searchIconClicked ? 'active' : ''}`}
            onClick={() => goToSearchPage()}>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '20px' }} />
          </div>
          <input
            type="text"
            className="input_search"
            placeholder="Tìm kiếm theo tên hoặc từ khóa"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchInput && (
            <div className="clearIcon" onClick={handleClearSearch}>
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: '20px' }} />
            </div>
          )}
        </div>
        <div className="searchOption">
          <div className="searchOption_title" onClick={() => setOpenOption(!openOption)}>
            <div>{searchOption.label}</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {openOption && (
            <div className="searchOption_option" ref={optionRef}>
              {SEARCH_OPTION.map((item, index) => (
                <div
                  key={index}
                  className="searchOption_option_item"
                  onClick={() => {
                    setSearchOption(item);
                    setOpenOption(false);
                  }}>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default SearchInput;
