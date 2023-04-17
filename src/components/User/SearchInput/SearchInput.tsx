import React, { useState, useRef, useEffect } from 'react';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_OPTION } from '../../../constants/constant';

const SearchInput = () => {
  const [openOption, setOpenOption] = useState(false);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTION[0]);

  let optionRef = useRef<HTMLDivElement>(null);

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
          placeholder="Search for articles..."
          // value={searchInput}
          // onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="searchOption">
          <div className="searchOption_title" onClick={() => setOpenOption(!openOption)}>
            <div>Article</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {openOption && (
            <div className="searchOption_option" ref={optionRef}>
              <div className="searchOption_option_item">Author</div>
              <div className="searchOption_option_item">Article</div>
            </div>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default SearchInput;
