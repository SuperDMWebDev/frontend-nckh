import React, { useState, useEffect } from 'react';
import Styled from './style';
import { useParams } from 'react-router-dom';
import { getDetailArticle, deleteArticle } from '../../../api/Article';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article>();
  const [authorList, setAuthorList] = useState<string[]>([]);

  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: 'Do you want to delete this article?',
      content: 'When clicked the OK button, this article will be deleted permanently.',
      async onOk() {
        try {
          handleDeleteArticle();
        } catch (e) {
          return console.log('Oops errors!');
        }
      },
      onCancel() {}
    });
  }

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
          toast.success('Delete article sucessfully');
          navigate('./search');
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.success('Fail to delete this article');
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const fetchArticlesOfLecturers = async () => {
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
  };

  const getAuthorList = (article: any) => {
    let nameList: string[] = [];
    article?.authors.map((item: any) => {
      if (item.lecturer_name != undefined || item.lecturer_name != null) {
        nameList.push(item.lecturer_name);
      } else {
        let name = item.lastName + ' ' + item.firstName;
        nameList.push(name);
      }
    });

    setAuthorList(nameList);
  };
  useEffect(() => {
    fetchArticlesOfLecturers();
  }, []);

  useEffect(() => {
    getAuthorList(article);
  }, []);

  return (
    <Styled>
      {article && (
        <div className="detail-article-body">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="article-title">{article.name}</div>
            <div className="button_delete" onClick={showConfirm}>
              <DeleteOutlined style={{ marginRight: '10px' }} />
              Delete
            </div>
          </div>

          <div className="article-author">
            <div>Authors: </div>
            <ul>
              {authorList.map((item) => (
                <li>{item}</li>
              ))}
              {/* <li>Grant,M</li>
              <li>Foster,T</li>
              <li>Dinh,DV</li>
              <li>Willetts,J </li>
              <li>Davis,G</li> */}
            </ul>
          </div>
          <div className="article-info">
            <div>
              <p>Journal: {article.journal}</p>
              <p>Publisher: IWA Publishing</p>
              <p>Publication Type: Journal Article</p>
              <p>
                Citation: Journal of Water, Sanitation and Hygiene for Development, 2020, 10, (4),
                pp. 659-669
              </p>
              <p>DOI: {article.DOI}</p>
              <p>ISSN: {article.ISSN}</p>
              <p>Scopus: {article.Scopus}</p>
              <p>Issue Date: {article.year}</p>
            </div>
          </div>

          <div className="article-content">
            <h2>ABSTRACT: </h2>
            <p>{article.abstract}</p>
          </div>
        </div>
      )}
    </Styled>
  );
}
