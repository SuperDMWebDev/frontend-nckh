import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_OPTION } from '../../../constants/constant';

const SearchInput = ({ getSearchOption }: any) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>();
  const [openOption, setOpenOption] = useState(false);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTION[0]);

  let optionRef = useRef<HTMLDivElement>(null);

  const goToSearchPage = () => {
    navigate('./search', { state: searchInput });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      goToSearchPage();
    }
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (optionRef.current != null) {
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
        <input
          type="text"
          className="input_search"
          placeholder="Search by name or keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="searchOption">
          <div className="searchOption_title" onClick={() => setOpenOption(!openOption)}>
            <div>{searchOption.label}</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {openOption && (
            <div className="searchOption_option" ref={optionRef}>
              {SEARCH_OPTION.map((item) => (
                <div
                  className="searchOption_option_item"
                  onClick={() => {
                    setSearchOption(item);
                    getSearchOption(item);
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
