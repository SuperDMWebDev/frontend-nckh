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
  faSearch,
  faAnglesDown
} from '@fortawesome/free-solid-svg-icons';
import { getAllFilterUniversities } from '../../../api/Configuration';

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
  const [selectedValue, setSelectedValue] = useState('asc');
  const [universityList, setUniversityList] = useState<any[]>([]);
  const [displayAllItems, setDisplayAllItems] = useState(false);

  const checkCurrentSearch = useCallback(() => {
    if (currentSearch === SEARCH_OPTION[0].value) {
      return true;
    }

    return false;
  }, [currentSearch]);

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

  const updateUniversities = useCallback(async () => {
    const response = await getAllFilterUniversities();
    response.map((item: any) => {
      return {
        ...item,
        checked: false
      };
    });
    if (response) {
      setUniversityList(response);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [navigate_searchOption]);
  useEffect(() => {
    setTotalPages(
      checkCurrentSearch()
        ? Math.ceil(listAuthors.length / itemsPerPage)
        : Math.ceil(listArticles.length / itemsPerPage)
    );
  }, [listAuthors, listArticles, checkCurrentSearch]);

  useEffect(() => {
    updateUniversities();
  }, [updateUniversities]);

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

  const handleSearch = useCallback(async () => {
    let universityIds: any[] = [];
    universityList.map((university) => {
      if (university.checked) {
        universityIds.push(university.id);
      }
    });

    if (navigate_searchOption.label === 'Bài báo') {
      const data = {
        searchOption: 'articles',
        keyword: navigate_searchInput,
        sort: selectedValue,
        universityIds
      };
      await fetchListArticle(data);
      setCurrentSearch('article');
    } else {
      const data = {
        searchOption: 'lecturers',
        keyword: navigate_searchInput,
        sort: selectedValue,
        universityIds
      };
      await fetchListLectures(data);
      setCurrentSearch('author');
    }
  }, [
    fetchListArticle,
    fetchListLectures,
    navigate_searchInput,
    navigate_searchOption.label,
    selectedValue,
    universityList
  ]);

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

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

  const handleSelectChange = (event: any) => {
    event.preventDefault();

    const { value } = event.target;

    setSelectedValue(value);
  };

  const totalItems = checkCurrentSearch() ? listAuthors.length : listArticles.length;
  const itemStart = (currentPage - 1) * itemsPerPage + 1;
  const itemEnd = Math.min(currentPage * itemsPerPage, totalItems);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, universityId: any) => {
    const isChecked = e.target.checked;
    console.log('item checkbox ', isChecked, universityId);

    let updatedList = universityList.map((university) => {
      if (university.id === universityId) {
        return { ...university, checked: isChecked };
      }

      return university;
    });

    setUniversityList(updatedList);
  };

  const resetCheckedUniversity = () => {
    let updatedList = universityList.map((university) => {
      return { ...university, checked: false };
    });

    setUniversityList(updatedList);
  };

  const countUniversityChecked = useCallback(() => {
    let count = 0;
    universityList.forEach((university) => {
      if (university.checked) {
        count++;
      }
    });

    return `${count} selected`;
  }, [universityList]);

  const handleShowMore = () => {
    setDisplayAllItems(!displayAllItems);
  };

  const handleChangeSearchOption = (item: any) => {
    setNavigate_searchOption(item);
    setOpenOption(false);
    setCurrentPage(1);
  };

  const visibleUniversityList = displayAllItems ? universityList : universityList.slice(0, 10);

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
                        handleChangeSearchOption(item);
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
      <div className="layout_main">
        <div className="result__left">
          <h2 className="sideBar__heading">Bộ lọc</h2>
          <div className="filter_university">
            <h3 className="sideBar__subHeading">
              <i className="fas fa-university"></i>
              <span>Trường đại học</span>
            </h3>
            <div className="sideBar__optionsHead">
              <div className="university--count">{countUniversityChecked()}</div>
              <button onClick={() => resetCheckedUniversity()}>Reset</button>
            </div>
            <div className="sideBar_item_container">
              {visibleUniversityList.length > 0 &&
                visibleUniversityList.map((item: any, index: any) => {
                  return (
                    <div className="sideBar_item" key={item.id}>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckBoxChange(e, item.id)}
                        checked={item.checked}
                      />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              {!displayAllItems && universityList.length > 10 && (
                <button className="show-button" onClick={handleShowMore}>
                  Show More
                </button>
              )}
              {displayAllItems && (
                <button className="show-button show-less" onClick={handleShowMore}>
                  Show Less
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="result__buffer"></div>
        <div className="result__pagination">
          <div className="sort_container">
            <div className="pagination_bar_left">
              <div className="dropdown_discovery">
                <label htmlFor="i11">Sắp xếp theo</label>
                <div className="select-container">
                  <select
                    id="i11"
                    aria-label="sort order"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    className="custom_select">
                    <option value="asc">Tên (A-Z)</option>
                    <option value="desc">Tên (Z-A)</option>
                  </select>
                  <FontAwesomeIcon icon={faAngleDown} className="dropdown-icon" />
                </div>
              </div>
            </div>
            <div className="pagination_bar_middle">
              <div>
                <div className="pagination_button__container">
                  <button
                    className={`btn-pre-next btn-left${currentPage <= 1 ? ' disabled' : ''}`}
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowLeft} />
                  </button>

                  {renderPageButtons()}

                  <button
                    className={`btn-pre-next btn-right${
                      currentPage >= totalPages ? ' disabled' : ''
                    }`}
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon className="deleteicon" fontSize={14} icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
            <div className="pagination_bar_right">
              <div>
                <strong>{itemStart}</strong> - <strong>{itemEnd}</strong> trên tổng số{' '}
                <strong>{totalItems}</strong>
              </div>
            </div>
          </div>
          <div className="list_container">
            {currentSearch !== 'article' ? (
              <div ref={scrollTop}>
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
              <div ref={scrollTop}>
                <div className="content content_article">
                  <div className="list_article">
                    {listArticles.length !== 0 ? (
                      listArticles
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item, index) => (
                          <ArticleCard key={`article-card-${index}`} data={item} />
                        ))
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
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="logo-container">
            <img src="/assets/images/logo_hcmus.jpg" alt="HCMUS Logo" className="logo" />
          </div>
          <div className="info-container">
            <p className="info">HCMUS - Ho Chi Minh City University of Science</p>
            <p className="info">
              227 Nguyễn Văn Cừ, Quận 5, TP.HCM, Việt Nam - (028) 38.354.266 - (028) 38.324.467
            </p>
          </div>
        </div>
      </footer>
    </Styled>
  );
}
