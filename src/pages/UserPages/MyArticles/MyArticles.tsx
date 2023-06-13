import React, { useRef, useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Styled from './style';
import { getListArticleWithKeyword } from '../../../api/Article';
import { getArticlesOfLecturers } from '../../../api/Article';
import MyArticleCard from '../../../components/User/MyArticleCard/MyArticleCard';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function MyArticles() {
  const navigate = useNavigate();
  const scrollTop = useRef<HTMLDivElement>(null);
  const [listArticles, setListArticles] = useState<Article[]>([]);
  const accountId = localStorage.getItem('accountId');

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };

  const fetchListArticle = async (accountId: any) => {
    let param = {
      data: {
        lecturerIds: [Number(accountId)]
      }
    };
    const res = await getArticlesOfLecturers(param);
    setListArticles(res.data.data);
  };

  useEffect(() => {
    fetchListArticle(accountId);
  }, []);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const maxVisibleButtons = 7;
  const listArti = Object.values(listArticles);
  const arr = listArti[0];

  const renderPageButtons = (): JSX.Element[] => {
    const visibleButtons: JSX.Element[] = [];
    const startPage: number = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage: number = Math.floor(arr?.slice(0).length / itemsPerPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      visibleButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active btn-pagination' : 'btn-pagination'}>
          {i}
        </button>
      );
    }

    return visibleButtons;
  };

  const totalPages = arr?.slice(0).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = arr?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentPage(pageNumber);
  };

  return (
    <Styled>
      <div className="center">
        <div
          style={{
            backgroundColor: '#EFEFEF',
            width: '90%',
            borderRadius: '20px',
            display: 'flex',
            height: '160px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px'
          }}>
          <div>
            <div
              style={{
                fontSize: '26px',
                margin: '12px',
                fontFamily: 'monospace',
                fontWeight: 'bolder',
                color: '#3f51b5',
                display: 'flex',
                justifyContent: 'center'
              }}>
              CÁC CÔNG BỐ KHOA HỌC CỦA TÔI
            </div>
            <div className="add-article-container">
              <button className="btn btn-add-article-2" onClick={() => navigate('/create-article')}>
                Thêm bài báo khoa học
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="center" ref={scrollTop}>
        <div className="content content_article">
          <div className="list_article">
            <div className="content-profile">
              {currentLecturers ? (
                currentLecturers?.map((item: any) => <MyArticleCard data={item} />)
              ) : (
                <>
                  <div
                    style={{
                      fontSize: '14px',
                      marginTop: '10px',
                      fontStyle: 'italic',
                      marginLeft: '-70px'
                    }}>
                    Không tìm thấy bài báo khoa học nào!
                  </div>
                </>
              )}
            </div>

            <div>
              <div
                style={{
                  marginBottom: '50px',
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                {/* Previous button */}
                <button
                  className="btn-pre-next"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}>
                  <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowLeft} />
                </button>

                {/* Page buttons */}
                {renderPageButtons()}

                {/* Next button */}
                <button
                  className="btn-pre-next"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}>
                  <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
}
