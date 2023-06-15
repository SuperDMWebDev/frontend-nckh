import React, { useState, useEffect, useCallback } from 'react';
import Styled from './style';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailArticle, deleteArticle } from '../../../api/Article';
import httpStatus from 'http-status';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { getLecturerIdFromAccountId } from '../../../utils/api';

type Article = {
  [key: string]: any;
  name: string;
};

export default function ArticleDetail() {
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
          navigate('/profile');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.success('Xóa bài báo thất bại!');
          navigate('/');
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
              {authorList.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>
          <div className="article-info">
            <div>
              {article.journal && (
                <p>
                  <span className="subTitle">Bài báo: </span>
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

          <div className="article-content">
            <h4>ABSTRACT: </h4>
            <p>{article.abstract}</p>
          </div>
        </div>
      )}
    </Styled>
  );
}
