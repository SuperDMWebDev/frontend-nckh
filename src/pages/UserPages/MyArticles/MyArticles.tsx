import React, { useRef, useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Styled from './style';
import { getListArticleWithKeyword } from '../../../api/Article';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';

type Article = {
    [key: string]: any; // 👈️ variable key
    name: string;
};

export default function MyArticles() {
    const scrollTop = useRef<HTMLDivElement>(null);
    const [listArticles, setListArticles] = useState<Article[]>([]);
    const accountId = localStorage.getItem("accountId");

    const handleBackSearch = () => {
        window.location.replace('http://localhost:5000/');
    };

    const fetchListArticle = async (data: any) => {
        console.log(data);
        const res = await getListArticleWithKeyword(data);
        setListArticles(res.data.data);
    };

    useEffect(() => {

    }, []);


    //PAGINATION
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
                    className={i === currentPage ? 'active btn-pagination' : 'btn-pagination'}
                >
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

    console.log(totalPages, indexOfLastItem, indexOfFirstItem, currentLecturers);

    const handlePageChange = (pageNumber: number) => {
        if (scrollTop.current) {
            scrollTop.current.scrollIntoView({ behavior: 'smooth' });
        }

        setCurrentPage(pageNumber);
    };

    return (
        <Styled>
            <div className="center">
                <div className="btn-back-search" onClick={handleBackSearch}>
                    <ArrowBackIcon /> quay lại trang tìm kiếm{' '}
                </div>
                <div
                    style={{
                        fontSize: '22px',
                        margin: '12px',
                        fontFamily: "monospace",
                        fontWeight: "bold"
                    }}>Các công bố khoa học
                </div>

                <div
                    style={{
                        backgroundColor: '#e6e4e4',
                        width: '100%',
                        display: 'flex',
                        height: "120px",
                        justifyContent: 'center'
                    }}>
                </div>
            </div>

            <div>
                <div className="center" ref={scrollTop}>
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
                            <div className="content-profile">
                                {listArticles.length !== 0 ? (
                                    listArticles[Number(accountId)].map((item: any) => <ArticleCard data={item} />)
                                ) : (
                                    <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                                        Chưa có bài báo khoa học nào.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div style={{
                                marginBottom: "50px",
                                marginTop: "30px"
                            }}>
                                {/* Previous button */}
                                <button
                                    className='btn-pre-next'
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </button>

                                {/* Page buttons */}
                                {renderPageButtons()}

                                {/* Next button */}
                                <button
                                    className='btn-pre-next'
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled>
    )
}
