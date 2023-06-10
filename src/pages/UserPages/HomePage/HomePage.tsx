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
            Ứng dụng của chúng tôi cung cấp một nền tảng toàn diện và dễ sử dụng để quản lý các công
            bố khoa học. Cho dù bạn là một nhà nghiên cứu, nhà khoa học hoặc chuyên gia học thuật,
            ứng dụng của chúng tôi được thiết kế để tối ưu hóa toàn bộ thời gian và công sức của bạn
          </div>
        </div>

        <SearchInput />

        <div className="popularSearch">
          Từ khóa tìm kiếm phổ biến: Tran Minh Triet, Nguyen Van Vu
        </div>
      </section>
    </Styled>
  );
};

export default HomePage;
