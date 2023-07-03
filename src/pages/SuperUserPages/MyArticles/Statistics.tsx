import React, { useRef, useState, useEffect } from 'react';
import Styled from './style';
import { exportExcelArticles, exportExcelBriefArticles, getArticles } from '../../../api/Article';
import MyArticleCard from '../../../components/User/MyArticleCard/MyArticleCard';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import httpStatus from 'http-status';
import ExportExcelModal from '../../../components/ExportExcelModal';

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

const itemsPerPage = 20;
const maxVisibleButtons = 7;

export default function Statistics() {
  const navigate = useNavigate();
  const scrollTop = useRef<HTMLDivElement>(null);
  const [listArticles, setListArticles] = useState<Article[]>([]);
  const [openExportModal, setOpenExportModal] = useState(false);

  const handleExport = async (selectedYear: any) => {
    await exportExcelArticles(selectedYear);
    setOpenExportModal(false);
  };

  const handleExportBrief = async (selectedYear: any) => {
    await exportExcelBriefArticles(selectedYear);
    setOpenExportModal(false);
  };

  const fetchListArticle = async () => {
    const res = await getArticles();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          console.log('res', res);
          setListArticles(res.data.data);
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
    fetchListArticle();
  }, []);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  // const arr = Object.values(listArticles)[0];
  const totalPages = Math.ceil(listArticles?.length / itemsPerPage);
  const totalItems = listArticles.length;
  const itemStart = (currentPage - 1) * itemsPerPage + 1;
  const itemEnd = Math.min(currentPage * itemsPerPage, totalItems);
  useEffect(() => {}, [currentPage, totalPages]);

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
  const currentLecturers = listArticles?.slice(indexOfFirstItem, indexOfLastItem);

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
              THỐNG KÊ
            </div>
            <div className="add-article-container">
              <button className="btn btn-add-article-2" onClick={() => setOpenExportModal(true)}>
                Xuất excel
              </button>
            </div>
            <ExportExcelModal
              visible={openExportModal}
              onClose={() => setOpenExportModal(false)}
              onExport={handleExport}
              onExportBrief={handleExportBrief}
            />
          </div>
        </div>
      </div>

      <div className="center" ref={scrollTop}>
        <div className="list_article">
          <div>
            <div
              style={{
                marginBottom: '20px',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              {/* Previous button */}
              <button
                className={`btn-pre-next${currentPage <= 1 ? ' disabled' : ''}`}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                <FontAwesomeIcon fontSize={14} icon={faArrowLeft} />
              </button>

              {/* Page buttons */}
              {renderPageButtons()}

              {/* Next button */}
              <button
                className={`btn-pre-next${currentPage >= totalPages ? ' disabled' : ''}`}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                <FontAwesomeIcon fontSize={14} icon={faArrowRight} />
              </button>
            </div>{' '}
            <div className="pagination_bar_right">
              <div>
                <strong>{itemStart}</strong> - <strong>{itemEnd}</strong> <span>trên tổng số </span>
                <strong>{totalItems}</strong>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </Styled>
  );
}
