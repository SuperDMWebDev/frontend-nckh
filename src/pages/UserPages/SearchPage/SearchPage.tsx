import React, { useState, useEffect } from 'react';
import { Form, Tab, Tabs } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import SearchInput from '../../../components/User/SearchInput/SearchInput';
import Styled from './style';
import AuthorCard from '../../../components/User/AuthorCard/AuthorCard';
import { SEARCH_OPTION } from '../../../constants/constant';
import { getArticles } from '../../../api/Article';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getListLecturers } from '../../../api/Lecturer';

interface SEARCH_INPUT_TYPE {
  value: string;
  label: string;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const typeSearch = location.state.searchOption;
  console.log(location.state.searchOption);

  const [searchInput, setSearchInput] = useState<string>(location.state);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTION[0]);

  const [articleList, setArticleList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);

  function handleClickArticle() {
    document.getElementById('detail_article')!.classList.add('detail_article_active');
  }

  function handleDeleteDetail() {
    document.getElementById('detail_article')!.classList.remove('detail_article_active');
  }

  const handleSearchOption = (item: any) => {
    setSearchOption(item);
  };

  const fetchArticle = async () => {
    const res = await getArticles();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setArticleList(data);
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

  const fetchLectures = async () => {
    const res = await getListLecturers();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setLecturerList(data);
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
    fetchArticle();
    fetchLectures();
  }, []);

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };

  return (
    <Styled>
      <div className="center">
        <div className="btn-back-search" onClick={handleBackSearch}>
          <ArrowBackIcon /> quay lại trang tìm kiếm{' '}
        </div>
        <div
          style={{
            fontSize: '17px',
            margin: '12px',
            fontFamily: "Montserrat, sans-serif"
          }}>{`${typeSearch.label.toUpperCase()}S SEARCH`}
        </div>

        <div
          style={{
            backgroundColor: '#e6e4e4',
            width: '100%',
            display: 'flex',
            height: "120px",
            justifyContent: 'center'
          }}>
          <SearchInput />
        </div>
      </div>

      {typeSearch.value !== "article" ? (
        <div className="center">
          <div className="list_article">
            {lecturerList && lecturerList.map((item) => <AuthorCard data={item} />)}
          </div>
        </div>
      ) : (
        <div className="center">
          <div className="content content_article">
            <div className="sort_article">
              <span
                style={{
                  marginRight: '20px',
                  fontSize: '16px',
                  color: '#0056ce',
                  fontWeight: 'bolder'
                }}>
                SORT BY
              </span>
              <button className="btn_sort">Most relevant</button>
              <button className="btn_sort">Most recent</button>
              <button className="btn_sort">Most cited</button>
            </div>

            <div className="list_article">
              {articleList && articleList.map((item) => <ArticleCard data={item} />)}
            </div>
          </div>
        </div>
      )}
    </Styled>
  );
}
