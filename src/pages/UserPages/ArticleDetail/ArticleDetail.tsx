import React, { useState, useEffect, useCallback } from 'react';
import Styled from './style';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailArticle, deleteArticle } from '../../../api/Article';
import httpStatus from 'http-status';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { getLecturerIdFromAccountId } from '../../../utils/api';
import LoaderLayer from '../../../components/LoaderLayer/LoaderLayer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

type Article = {
  [key: string]: any;
  name: string;
};

export default function ArticleDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article>();
  const [authorList, setAuthorList] = useState<string[]>([]);
  const lecturerId = localStorage.getItem('lecturerId');
  const accountId = localStorage.getItem('accountId');
  const [isEnableEdit, setIsEnableEdit] = useState<boolean>(true);

  const { confirm } = Modal;

  const handleDeleteArticle = async () => {
    var payload = {
      data: {
        data: [
          {
            id: Number(id)
          }
        ]
      }
    };
    const res = await deleteArticle(payload);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          toast.success('Xóa bài báo thành công!');
          navigate('/my-articles');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.success('Xóa bài báo thất bại!');
          navigate('/my-articles');
          break;
        }
        default:
          break;
      }
    }
  };

  function showConfirm() {
    confirm({
      title: 'Bạn có muốn xóa bài báo này?',
      content: 'Khi nhấp OK, bài báo này sẽ bị xóa vĩnh viễn.',
      async onOk() {
        try {
          handleDeleteArticle();
        } catch (e) {
          return console.log('Error');
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {}
    });
  }

  const fetchArticlesOfLecturers = useCallback(async () => {
    const res = await getDetailArticle(id);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          setArticle(data);
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
  }, []);

  const getAuthorList = (article: any) => {
    let nameList: string[] = [];
    // eslint-disable-next-line array-callback-return
    article?.authors.map((item: any) => {
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
    const getInfo = async () => {
      if (accountId && !lecturerId) {
        const response = await getLecturerIdFromAccountId(accountId);
        if (response.data.code === 0) {
          const { lecturerId } = response.data;
          localStorage.setItem('lecturerId', lecturerId);
        }
      }

      if (accountId) {
        setIsEnableEdit(true);
      } else {
        setIsEnableEdit(false);
      }
    };
    getInfo();
  }, [accountId]);
  useEffect(() => {
    fetchArticlesOfLecturers();
  }, [fetchArticlesOfLecturers]);

  useEffect(() => {
    getAuthorList(article);
  }, [article, lecturerId]);

  return (
    <Styled>
      {isLoading && <LoaderLayer />}
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <Link fontSize={14} underline="hover" color="#0056ce" href="/">
            Trang chủ
          </Link>
          <Link fontSize={14} underline="hover" color="#0056ce" href="/search">
            Tìm kiếm
          </Link>
          <Typography fontSize={14} color="text.primary">
            Chi tiết
          </Typography>
        </Breadcrumbs>
      </div>
      {article && (
        <div className="detail-article-body">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="article-title">{article.name}</div>
            {isEnableEdit && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className="button_update" onClick={() => navigate(`/update-article/${id}`)}>
                  <EditOutlined style={{ marginRight: '10px' }} />
                  Chỉnh sửa
                </div>
                <div className="button_delete" onClick={showConfirm}>
                  <DeleteOutlined style={{ marginRight: '10px' }} />
                  Xóa
                </div>
              </div>
            )}
          </div>

          <div className="article-author">
            <div className="article-author_title">Tác giả: </div>
            <div className="article-author_list">
              {authorList
                .map((item) => {
                  return item;
                })
                .join(', ')}
            </div>
          </div>

          <div className="article-info">
            <div>
              {article.journal && (
                <p>
                  <span className="subTitle">Tạp chí: </span>
                  {article.journal}
                </p>
              )}
              {article.conference && (
                <p>
                  <span className="subTitle">Hội nghị:</span>
                  {article.conference}
                </p>
              )}
              {article.rank && (
                <p>
                  <span className="subTitle">Rank: </span>
                  {article.rank}
                </p>
              )}
              {article.DOI && (
                <p>
                  <span className="subTitle">DOI: </span>
                  {article.DOI}
                </p>
              )}
              {article.Scopus && (
                <p>
                  <span className="subTitle">Scopus: </span>
                  {article.Scopus}
                </p>
              )}
              {article.ISSN && (
                <p>
                  <span className="subTitle">ISSN: </span> {article.ISSN}
                </p>
              )}
              {article.ISBN && (
                <p>
                  <span className="subTitle">ISBN:</span> {article.ISBN}
                </p>
              )}
              {article.volume && (
                <p>
                  <span className="subTitle">Volume: </span>
                  {article.volume}
                </p>
              )}
              {article.PII && (
                <p>
                  <span className="subTitle">PII: </span>
                  {article.PII}
                </p>
              )}
              {article.PMID && (
                <p>
                  <span className="subTitle">PMID: </span>
                  {article.PMID}
                </p>
              )}
              {article.SGR && (
                <p>
                  <span className="subTitle">SGR:</span> {article.SGR}
                </p>
              )}
              {article.day && article.month && article.year ? (
                <p>
                  <span className="subTitle">Ngày công bố:</span> {article.day} - {article.month} -
                  {article.year}
                </p>
              ) : (
                <p>
                  <span className="subTitle">Ngày công bố:</span> {article.year}
                </p>
              )}
            </div>
          </div>

          <div className="file-section">
            {!article.files ? null : (
              <>
                <div className="fileTitle">Bài báo: </div>
                <div className="fileList">
                  {article.files.map((item: any, index: any) => (
                    <div key={index}>
                      <a
                        style={{
                          width: '120px',
                          height: 'auto',
                          marginLeft: '5px',
                          textDecoration: 'none'
                        }}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer">
                        {item.original_file_name}
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="article-content">
            <h4>ABSTRACT: </h4>
            <p>{article.abstract}</p>
          </div>
        </div>
      )}
    </Styled>
  );
}
