import React, { useState, useEffect } from 'react';
import Styled from './style';
import { useNavigate } from 'react-router-dom';

const ArticleProfileCard = (props: any) => {
  const { data } = props;
  console.log(data);
  const [authorList, setAuthorList] = useState<string[]>([]);
  const navigate = useNavigate();

  const getAuthorList = (data: any) => {
    let nameList: string[] = [];
    // eslint-disable-next-line array-callback-return
    data?.authors.map((item: any) => {
      if (item.lecturer_name !== undefined && item.lecturer_name !== null) {
        nameList.push(item.lecturer_name);
      }
      if (item.lastName && item.firstName) {
        let name = `${item.lastName} ${item.firstName}`;
        nameList.push(name);
      }
    });

    setAuthorList(nameList);
  };

  useEffect(() => {
    getAuthorList(data);
  }, [data]);

  console.log(authorList);

  const handleGoToDetail = (id: any) => {
    navigate(`/article-detail/${id}`);
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
            <div>
              <div style={{ display: 'inline' }}>
                <div
                  className="article-author_list2"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                  }}>
                  {authorList.map((item) => (
                    <div style={{ marginRight: '4px' }}>{item},</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="user-position">{data?.abstract}</div>
          </div>
          <div className="right-part">
            {data?.rank && data?.rank != 'Unranked' ? `Rank ${data?.rank}` : 'Unranked'}
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default ArticleProfileCard;
