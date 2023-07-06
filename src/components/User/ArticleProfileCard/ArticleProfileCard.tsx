import React, { useState, useEffect } from 'react';
import Styled from './style';
import { useNavigate } from 'react-router-dom';

const ArticleProfileCard = (props: any) => {
  const { data } = props;
  const isLogin = !!localStorage.getItem('accessToken');
  const [authorList, setAuthorList] = useState<string[]>([]);
  const navigate = useNavigate();
  const roleUser = localStorage.getItem('role');
  const [citationScopus, setCitationScopus] = useState<number | null>(0);
  const [citationGGScholar, setCitationGGScholar] = useState<number | null>(0);
  const [totalCitationCount, setTotalCitationCount] = useState<number>(0);

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
    setCitationScopus(data?.citationCount);
    setCitationGGScholar(data?.googleScholarCitationCount);
  }, [data]);

  useEffect(() => {
    const citationCountScopus: number = citationScopus ? citationScopus : 0;
    const citationCountGGScholar: number = citationGGScholar ? citationGGScholar : 0;
    setTotalCitationCount(citationCountScopus + citationCountGGScholar);
  });

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
                <div className="article-author_list2">
                  {authorList
                    .map((item) => {
                      return item;
                    })
                    .join(', ')}
                </div>
              </div>
            </div>
            <div className="user-position">{data?.abstract}</div>
          </div>
          <div className="right-part">
            <div className="citationContainer">
              <div className="right-part__num">{citationScopus}</div>
              <div>Trích dẫn</div>
              {citationScopus !== null || citationGGScholar !== null ? (
                <div className="citationModal">
                  {citationScopus !== null ? (
                    <div>Trích dẫn từ Scopus: {citationScopus}</div>
                  ) : null}
                  {citationGGScholar !== null ? (
                    <div style={{ marginTop: '5px' }}>Trích dẫn từ Google Scholar: {citationGGScholar}</div>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div>
              {isLogin && data?.rank && roleUser == '2' && data?.rank !== 'Unranked' ? (
                <div className="citationContainer">
                  <div className="right-part__num">{data?.rank}</div>
                  <div>Ranking</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default ArticleProfileCard;
