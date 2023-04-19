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

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  const goToSearchPage = () => {
    navigate('./search', { state: searchInput });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      goToSearchPage();
    }
  };

  return (
    <Styled>
      <section className="banner">
        <div className="content">
          <div className="content_title">Quản lý bài viết khoa học</div>
          <div className="content_script">
            Đưa những nghiên cứu của bạn vào cuộc sống, để bạn có thể tạo ảnh hưởng đến mai sau
          </div>
          <div className="content_script">
            Với hơn 100 triệu bài viết được tìm kiếm của nhiều nhà xuất bản và con số này đang tiếp tục tăng.
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

        <div className="popularSearch">Từ khóa tìm kiếm phổ biến: COVID-19, Bioenergy, Obesity</div>
      </section>
    </Styled>
  );
};

export default HomePage;
