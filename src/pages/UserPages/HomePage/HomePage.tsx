import React, { useState } from 'react';
import Styled from './style';
import SearchInput from '../../../components/User/SearchInput/SearchInput';

interface SEARCH_INPUT_TYPE {
  value: string;
  label: string;
}

const HomePage: React.FC = () => {
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

        <SearchInput
          getSearchOption={(item: SEARCH_INPUT_TYPE) => console.log('Home page option', item)}
        />

        <div className="popularSearch">Popular searches: COVID-19, Bioenergy, Obesity</div>
      </section>
    </Styled>
  );
};

export default HomePage;
