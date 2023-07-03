import React, { useRef, useState, useEffect } from 'react';
import Styled from './style';
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
  const lecturerId = localStorage.getItem('lecturerId');

  const handleBackSearch = () => {
    navigate('/');
  };

  const fetchListArticle = async (lecturerId: any) => {
    let param = {
      data: {
        lecturerIds: [Number(lecturerId)]
      }
    };
    const res = await getArticlesOfLecturers(param);
    setListArticles(res.data.data);
  };

  useEffect(() => {
    fetchListArticle(lecturerId);
  }, []);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const maxVisibleButtons = 7;
  const arr = Object.values(listArticles)[0];
  const totalPages = Math.ceil(arr?.length / itemsPerPage);
  useEffect(() => { }, [currentPage, totalPages]);

  const renderPageButtons = (): JSX.Element[] => {
    const visibleButtons: JSX.Element[] = [];
    const startPage: number = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage: number = totalPages;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = arr?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentPage(pageNumber);
  };

  const handleChangeItemsPerPage = (event: any) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }

    setItemsPerPage(event.target.value)
  }

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

          <div style={{ position: "relative" }}>
            <div
              style={{
                marginBottom: '50px',
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              {/* Previous button */}
              <button
                className={`btn-pre-next${currentPage <= 1 ? ' disabled' : ''}`}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowLeft} />
              </button>

              {/* Page buttons */}
              {renderPageButtons()}

              {/* Next button */}
              <button
                className={`btn-pre-next${currentPage >= totalPages ? ' disabled' : ''}`}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowRight} />
              </button>
            </div>

            <div style={{ position: "absolute", top: 0, right: 0 }} className="dropdown-perpage">
              <select id="dropdown" value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
                <option value={100}>100 / trang</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
}
