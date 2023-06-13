import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Styled from './style';
import AuthorCard from '../../../components/User/AuthorCard/AuthorCard';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import { getListArticleWithKeyword } from '../../../api/Article';
import { getListLecturerWithKeyword } from '../../../api/Lecturer';
import { SEARCH_OPTION } from '../../../constants/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [listArticles, setListArticles] = useState([]);
  const [listAuthors, setListAuthors] = useState([]);

  const [currentSearch, setCurrentSearch] = useState<string>(location.state.searchOption.value);

  const [navigate_searchOption, setNavigate_searchOption] = useState(location.state.searchOption);
  const [navigate_searchInput, setNavigate_searchInput] = useState(location.state.searchInput);

  const [openOption, setOpenOption] = useState(false);
  let optionRef = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (optionRef.current !== null) {
        if (!optionRef.current.contains(e.target)) {
          setOpenOption(false);
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (navigate_searchOption.label == 'Article') {
        const data = {
          searchOption: 'articles',
          keyword: navigate_searchInput
        };
        fetchListArticle(data);
        setCurrentSearch('article');
      } else {
        const data = {
          searchOption: 'lecturers',
          keyword: navigate_searchInput
        };
        fetchListLectures(data);
        setCurrentSearch('author');
      }
    }
  };

  const fetchListArticle = async (data: any) => {
    const res = await getListArticleWithKeyword(data);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setListArticles(data);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const fetchListLectures = async (data: any) => {
    const res = await getListLecturerWithKeyword(data);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setListAuthors(data);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (navigate_searchOption.label == 'Article') {
      const data = {
        searchOption: 'articles',
        keyword: navigate_searchInput
      };
      fetchListArticle(data);
      setCurrentSearch('article');
    } else {
      const data = {
        searchOption: 'lecturers',
        keyword: navigate_searchInput
      };
      fetchListLectures(data);
      setCurrentSearch('author');
    }
  }, [navigate_searchOption]);

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const maxVisibleButtons = 7;

  const renderPageButtons = (): JSX.Element[] => {
    const visibleButtons: JSX.Element[] = [];
    const startPage: number = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage: number = Math.floor(listArticles.length / itemsPerPage + 1);

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

  const totalPages = listArticles.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = listArticles.slice(indexOfFirstItem, indexOfLastItem);

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
            fontSize: '22px',
            margin: '12px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>
          {`${navigate_searchOption.label.toUpperCase()}S SEARCH`}
        </div>

        <div
          style={{
            backgroundColor: '#EFEFEF',
            width: '100%',
            display: 'flex',
            height: '120px',
            justifyContent: 'center'
          }}>
          <div className="searchContainer">
            <input
              type="text"
              className="input_search"
              placeholder="Search by name or keyword"
              value={navigate_searchInput}
              onChange={(e) => setNavigate_searchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="searchOption">
              <div className="searchOption_title" onClick={() => setOpenOption(!openOption)}>
                <div>{navigate_searchOption.label}</div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {openOption && (
                <div className="searchOption_option" ref={optionRef}>
                  {SEARCH_OPTION.map((item) => (
                    <div
                      className="searchOption_option_item"
                      onClick={() => {
                        setNavigate_searchOption(item);
                        setOpenOption(false);
                      }}>
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentSearch != 'article' ? (
        <div className="center" ref={scrollTop}>
          <div className="list_article">
            {listAuthors ? (
              listAuthors.map((item) => <AuthorCard data={item} />)
            ) : (
              <>
                <div
                  style={{
                    fontSize: '14px',
                    marginTop: '10px',
                    fontStyle: 'italic',
                    marginLeft: '-70px'
                  }}>
                  Không tìm thấy tác giả nào!
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="center" ref={scrollTop}>
          <div className="content content_article">
            <div className="list_article">
              {currentLecturers.length != 0 ? (
                currentLecturers.map((item) => <ArticleCard data={item} />)
              ) : (
                <>
                  <div
                    style={{
                      fontSize: '14px',
                      marginTop: '10px',
                      fontStyle: 'italic',
                      marginLeft: '-70px'
                    }}>
                    Không tìm thấy tác giả nào!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="sort_article">
        <div>
          <div
            style={{
              marginBottom: '50px',
              marginTop: '30px'
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
    </Styled>
  );
}
