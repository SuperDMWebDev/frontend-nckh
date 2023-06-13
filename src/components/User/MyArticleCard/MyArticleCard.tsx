import React from 'react';
import Styled from './style';

const MyArticleCard = (props: any) => {
  const { data } = props;

  const handleGoToDetail = (id: any) => {
    window.location.replace(`http://localhost:5000/article-detail/${id}`);
  };

  return (
    <Styled>
      <div className="card_article">
        <div className="card-top-part">
          <div className="left-part">
            <div className="user-name">
              <div className="link_title" onClick={() => handleGoToDetail(data.id)}>
                <p className="name">{data?.name}</p>
              </div>
            </div>
            <div className="user-field">{data?.journal}</div>
            <div className="user-field">Tác giả A, Tác giả B</div>
            <div className="user-position">{data?.abstract}</div>
          </div>
          {data?.rank && <div className="right-part">Rank {data?.rank}</div>}
        </div>

        {/* <div className="card-bottom-part">
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faAdd} />
            <div className="card-bottom-part__item">Add to library</div>
          </div>
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faFilePdf} />
            <div className="card-bottom-part__item">Sign in to view PDF</div>
          </div>
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faNewspaper} />
            <div className="card-bottom-part__item">Related</div>
          </div>
        </div> */}
      </div>
    </Styled>
  );
};

export default MyArticleCard;
