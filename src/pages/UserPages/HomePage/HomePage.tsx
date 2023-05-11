import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Styled from './style';
import SearchInput from '../../../components/User/SearchInput/SearchInput';

interface SEARCH_INPUT_TYPE {
  value: string;
  label: string;
}

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
            Với hơn 100 triệu bài viết được tìm kiếm của nhiều nhà xuất bản và con số này đang tiếp
            tục tăng.
          </div>
        </div>

        <SearchInput />

        <div className="popularSearch">Từ khóa tìm kiếm phổ biến: COVID-19, Bioenergy, Obesity</div>
      </section>
    </Styled>
  );
};

export default HomePage;
