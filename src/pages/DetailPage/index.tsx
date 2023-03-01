import React from 'react';
import TopBar from '../../components/TopBar';
import Styled from './style';

const DetailPage = () => {
  return (
    <Styled>
      <div className="title">DetailPage</div>
      <div className="content-wrapper">
        <div className="content_row">
          <div className="row_title">Username:</div>
          <div>trinhde</div>
        </div>
        <div className="content_row">
          <div className="row_title">Role:</div>
          <div>Scholar</div>
        </div>
        <div className="content_row">
          <div className="row_title">Created at:</div>
          <div>22/02/2022</div>
        </div>
        <div className="content_row">
          <div className="row_title">Updated at:</div>
          <div>22/02/2022</div>
        </div>
      </div>
    </Styled>
  );
};

export default DetailPage;
