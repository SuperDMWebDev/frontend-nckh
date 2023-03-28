import React, { useState } from 'react';
import Styled from './style';
import NavBarUser from '../../../components/User/NavBarUser/NavBarUser';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '100px',
  backgroundColor: '#efefef',
  // marginLeft: 0,
  width: '40%',
  marginTop: '85px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 15px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  opacity: '41%',
  svg: {
    width: '20px',
    height: '20px'
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: '#959595',
  '& .MuiInputBase-input': {
    padding: '15px',
    paddingLeft: '40px',
    fontSize: '16px'
  },
  'input::placeholder': {
    color: 'black',
    opacity: '41%',
    fontStyle: 'italic',
    fontSize: '16px'
  }
}));

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const goToSearchPage = () => {
    navigate('./search', { state: searchInput });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      goToSearchPage();
    }
  };

  return (
    <Styled>
      <section className="banner">
        <div className="content">
          <div className="content_title">Scientific Article Management</div>
          <div className="content_script">
            Brings your research to life, so you can make an impact on tomorrow
          </div>
          <div className="content_script">
            Search over 100 million cross-publisher articles and counting
          </div>
        </div>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm kiếm..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchInput}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </Search>

        <div className="popularSearch">Popular searches: COVID-19, Bioenergy, Obesity</div>
      </section>
    </Styled>
  );
};

export default HomePage;
