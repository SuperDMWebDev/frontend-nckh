import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Styled from './style';
import AuthorCard from '../../../components/User/AuthorCard/AuthorCard';
import httpStatus from 'http-status';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import { getListArticleWithKeyword } from '../../../api/Article';
import { getListLecturerWithKeyword } from '../../../api/Lecturer';
import { SEARCH_OPTION } from '../../../constants/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faTimes,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const itemsPerPage = 7;
const maxVisibleButtons = 7;

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const customIconStyle = {
    fontWeight: 300,
    fontSize: '20px',
    color: '#949494'
  };

  const [listArticles, setListArticles] = useState([]);
  const [listAuthors, setListAuthors] = useState([]);
  const [navigate_searchOption, setNavigate_searchOption] = useState(
    location.state ? location.state.searchOption : SEARCH_OPTION[0]
  );
  const [currentSearch, setCurrentSearch] = useState<string>(
    location.state ? location.state.searchOption.value : SEARCH_OPTION[0].value
  );
  const [navigate_searchInput, setNavigate_searchInput] = useState(
    location.state && location.state.searchInput ? location.state.searchInput : ''
  );
  const [openOption, setOpenOption] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const scrollTop = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const checkCurrentSearch = useCallback(() => {
    if (currentSearch === SEARCH_OPTION[0].value) {
      return true;
    }

    return false;
  }, [currentSearch]);

  useEffect(() => {
    console.log('currentSearch ', currentSearch, currentPage);
  }, [currentSearch, currentPage]);
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

  useEffect(() => {
    setTotalPages(
      checkCurrentSearch()
        ? Math.ceil(listAuthors.length / itemsPerPage)
        : Math.ceil(listArticles.length / itemsPerPage)
    );
  }, [listAuthors, listArticles, checkCurrentSearch]);

  const fetchListArticle = useCallback(
    async (data: any) => {
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
    },
    [navigate]
  );

  const fetchListLectures = useCallback(
    async (data: any) => {
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
    },
    [navigate]
  );

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      if (navigate_searchOption.label === 'Bài báo') {
        const data = {
          searchOption: 'articles',
          keyword: navigate_searchInput
        };
        await fetchListArticle(data);
        setCurrentSearch('article');
      } else {
        const data = {
          searchOption: 'lecturers',
          keyword: navigate_searchInput
        };
        await fetchListLectures(data);
        setCurrentSearch('author');
      }
    }
  };

  const handleSearch = async () => {
    if (navigate_searchOption.label === 'Bài báo') {
      const data = {
        searchOption: 'articles',
        keyword: navigate_searchInput
      };
      await fetchListArticle(data);
      setCurrentSearch('article');
    } else {
      const data = {
        searchOption: 'lecturers',
        keyword: navigate_searchInput
      };
      await fetchListLectures(data);
      setCurrentSearch('author');
    }
  };

  useEffect(() => {
    if (navigate_searchOption.label === 'Bài báo') {
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
  }, [fetchListArticle, fetchListLectures, navigate_searchInput, navigate_searchOption]);

  const handlePageChange = (pageNumber: number) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }

    setCurrentPage(pageNumber);
  };

  const renderPageButtons = useCallback(() => {
    const visibleButtons: JSX.Element[] = [];
    const startPage: number = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage: number = Math.min(startPage + maxVisibleButtons - 1, totalPages);

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
  }, [currentPage, totalPages]);

  const handleClearSearch = () => {
    setNavigate_searchInput('');
  };

  return (
    <Styled>
      <div className="center">
        <div className="searchPage__title">
          {`TÌM KIẾM ${navigate_searchOption.label.toUpperCase()}`}
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
            <div className="searchText">
              <div className={`searchIcon`} onClick={() => handleSearch()}>
                <FontAwesomeIcon icon={faSearch} style={customIconStyle} />
              </div>

              <input
                type="text"
                className="input_search"
                placeholder="Tìm kiếm bằng tên hoặc từ khóa"
                value={navigate_searchInput}
                onChange={(e) => setNavigate_searchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {navigate_searchInput && (
                <div className="clearIcon" onClick={() => handleClearSearch()}>
                  <FontAwesomeIcon icon={faTimes} style={customIconStyle} />
                </div>
              )}
            </div>
            <div className="searchOption">
              <div className="searchOption_title" onClick={() => setOpenOption(!openOption)}>
                <div>{navigate_searchOption.label}</div>
                <FontAwesomeIcon icon={faAngleDown} style={customIconStyle} />
              </div>
              {openOption && (
                <div className="searchOption_option" ref={optionRef}>
                  {SEARCH_OPTION.map((item, index) => (
                    <div
                      key={`searchOption-${index}`}
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
      {currentSearch !== 'article' ? (
        <div className="center" ref={scrollTop}>
          <div className="list_article">
            {listAuthors.length !== 0 ? (
              listAuthors
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item, index) => <AuthorCard key={`author-card-${index}`} data={item} />)
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
              {listArticles.length !== 0 ? (
                listArticles
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((item, index) => <ArticleCard key={`article-card-${index}`} data={item} />)
              ) : (
                <>
                  <div
                    style={{
                      fontSize: '14px',
                      marginTop: '10px',
                      fontStyle: 'italic',
                      marginLeft: '-70px'
                    }}>
                    Không tìm thấy bài báo nào!
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
            <button
              className={`btn-pre-next${currentPage <= 1 ? ' disabled' : ''}`}
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}>
              <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowLeft} />
            </button>

            {renderPageButtons()}

            <button
              className={`btn-pre-next${currentPage >= totalPages ? ' disabled' : ''}`}
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
              <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </Styled>
  );
}
