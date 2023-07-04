import React, { useEffect, useState, useRef } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HouseIcon from '@mui/icons-material/House';
import WcIcon from '@mui/icons-material/Wc';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PortraitIcon from '@mui/icons-material/Portrait';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { getInfoProfile } from '../../../api/Lecturer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getArticlesOfLecturers } from '../../../api/Article';
import { useNavigate, useParams } from 'react-router-dom';
import httpStatus from 'http-status';
import ArticleProfileCard from '../../../components/User/ArticleProfileCard/ArticleProfileCard';
import './LecturerDetail.css';
import ModalEditBook from '../../../components/User/ModalLecturer/ModalEditBook/ModalEditBook';
import ModalEditDegree from '../../../components/User/ModalLecturer/ModalEditDegree/ModalEditDegree';
import ModalEditWorkPosition from '../../../components/User/ModalLecturer/ModalEditWorkPosition/ModalEditWorkPosition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ModalEditExpertises from '../../../components/User/ModalLecturer/ModalEditExpertises/ModalEditExpertises';
import ModalEditSubjectTeaching from '../../../components/User/ModalLecturer/ModalEditSubjectTeaching/ModalEditSubjectTeaching';

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

type Lecturer1 = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function LecturerDetail() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);
  const [lecturer, setLecturer] = useState<Lecturer1>();
  const [currentPosition, setCurrentPosition] = useState<any>();
  const [bio, setBio] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [linkInner, setLinkInner] = useState<string>('');
  const token = localStorage.getItem('accessToken');
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [lecturerFiles, setLecturerFiles] = useState<any[]>([]);
  const { id }: any = useParams();
  const role = localStorage.getItem('role');

  const fetchArticle = async () => {
    let param = {
      data: {
        lecturerIds: [Number(id)]
      }
    };

    const res = await getArticlesOfLecturers(param);
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

  useEffect(() => {
    fetchArticle();
  }, []);

  useEffect(() => {
    const data: Promise<Lecturer1> = getInfoProfile(id);
    data
      .then((result) => {
        setLecturer(result);
        setEmail(result.contacts[0].value);
        setAddress(result.contacts[1].value);
        setPhone(result.contacts[2].value);
        setLink(result.contacts[3].value);
        setLecturerFiles(result.lecturerFiles);
        if (result.contacts[3]?.value.length >= 25) {
          setLinkInner(result.contacts[3].value.slice(0, 25) + '...');
        } else {
          setLinkInner(result.contacts[3].value);
        }
        result?.workPositions.map((workPosition: any) => {
          workPosition.isNow == 1 ? setCurrentPosition(workPosition) : null;
        });
        result.bio !== null ? setBio(result.bio) : setBio('');
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  const handleTab1 = () => {
    setCurrentTab(1);
    document.getElementById('1')?.classList.add('tab-selected');
    document.getElementById('2')?.classList.remove('tab-selected');
    document.getElementById('3')?.classList.remove('tab-selected');
  };

  const handleTab2 = () => {
    setCurrentTab(2);
    document.getElementById('2')?.classList.add('tab-selected');
    document.getElementById('1')?.classList.remove('tab-selected');
    document.getElementById('3')?.classList.remove('tab-selected');
  };

  const handleTab3 = () => {
    setCurrentTab(3);
    document.getElementById('3')?.classList.add('tab-selected');
    document.getElementById('1')?.classList.remove('tab-selected');
    document.getElementById('2')?.classList.remove('tab-selected');
  };

  const handleBackSearch = () => {
    if (role === '0') {
      const articleId = localStorage.getItem('articleId');
      navigate(`/article-detail/${articleId}`);
    } else {
      navigate('/search');
    }
  };

  // PAGINATION ARTICLES
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisibleButtons = 5;
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const scrollTop = useRef<HTMLDivElement>(null);
  const listArti = Object.values(articleList);
  const arr = listArti[0];

  const totalPages = arr?.slice(0).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = arr?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }

    setCurrentPage(pageNumber);
  };

  const renderPageButtons = (): JSX.Element[] => {
    const visibleButtons: JSX.Element[] = [];
    const startPage: number = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage: number = Math.floor(totalPages / itemsPerPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      visibleButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'btn-pagination-active' : 'btn-pagination'}>
          {i}
        </button>
      );
    }

    return visibleButtons;
  };

  const handleChangeItemsPerPage = (event: any) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }

    setItemsPerPage(event.target.value)
  }

  return (
    <Styled>
      <div className="header_topbar">
        {role === '0' ? (
          <div className="btn-back-search" onClick={handleBackSearch}>
            <ArrowBackIcon /> quay lại trang trước{' '}
          </div>
        ) : (
          <div className="btn-back-search" onClick={handleBackSearch}>
            <ArrowBackIcon /> quay lại trang tìm kiếm{' '}
          </div>
        )}
        <ul className="header_tab">
          <li className="content_tab">
            <div id="1" className="content_tab_name tab-selected" onClick={handleTab1}>
              THÔNG TIN
            </div>
          </li>
          <li className="content_tab">
            <div id="2" className="content_tab_name" onClick={handleTab2}>
              CÔNG BỐ KHOA HỌC
            </div>
          </li>
          <li className="content_tab">
            <div id="3" className="content_tab_name" onClick={handleTab3}>
              NGHIÊN CỨU
            </div>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="profile">
          <img
            className="img-avatar"
            src={
              lecturer?.avatar == null ||
              lecturer?.avatar == '' ||
              lecturer?.avatar == 'data:image/png;base64,'
                ? 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                : lecturer?.avatar
            }
            alt=""
          />
          <div className="name-profile">{lecturer?.name}</div>
          <div className="line">.........</div>
          <div style={{ textAlign: 'left' }}>
            <h4 className="field-profile">THÔNG TIN CÁ NHÂN</h4>
            <div>
              <div className="field-profile-info">
                <PortraitIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {lecturer?.currentDisciplines == undefined ? (
                    <>
                      <span
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '1px'
                        }}>
                        Chưa cập nhật
                      </span>
                    </>
                  ) : (
                    <>
                      {!lecturer?.currentDisciplines[0].position ? (
                        <>
                          <span
                            style={{
                              fontSize: '13px',
                              fontStyle: 'italic',
                              marginLeft: '1px'
                            }}>
                            Chưa cập nhật
                          </span>
                        </>
                      ) : (
                        lecturer?.currentDisciplines[0].position
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="field-profile-info">
                <PlaceIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {lecturer?.currentDisciplines == undefined ? (
                    <>
                      <span
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '1px'
                        }}>
                        Chưa cập nhật
                      </span>
                    </>
                  ) : (
                    <>
                      {lecturer?.currentDisciplines[0].departmentName} -{' '}
                      {lecturer?.currentDisciplines[0].universityName}
                    </>
                  )}
                </span>
              </div>
              <div className="field-profile-info">
                <WcIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {!lecturer?.gender ? (
                    <>
                      <span
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '1px'
                        }}>
                        Chưa cập nhật
                      </span>
                    </>
                  ) : (
                    lecturer?.gender
                  )}
                </span>
              </div>
              {/* <div className="field-profile-info">
                <CalendarMonthIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{lecturer?.dateOfBirth}</span>
              </div> */}
              {!email ? null : (
                <>
                  <div className="field-profile-info">
                    <EmailIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{!email ? null : email}</span>
                  </div>
                </>
              )}
              {/* {!phone ? null : (
                <>
                  <div className="field-profile-info">
                    <PhoneAndroidIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{!phone ? null : phone}</span>
                  </div>
                </>
              )} */}
              {!address ? null : (
                <>
                  <div className="field-profile-info">
                    <HouseIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{!address ? null : address}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="line">.........</div>
          <div>
            <h4 className="field-profile">THÔNG TIN BỔ SUNG</h4>
            <div className="field-profile-info" style={{ width: '95%', height: 'auto' }}>
              {!lecturerFiles ? (
                <>
                  <AttachmentIcon style={{ fontSize: '20px' }} />
                  <span
                    style={{
                      fontSize: '13px',
                      fontStyle: 'italic',
                      marginLeft: '5px'
                    }}>
                    Chưa cập nhật
                  </span>
                </>
              ) : (
                lecturerFiles.map((item, index) => (
                  <div key={index}>
                    <AttachmentIcon style={{ fontSize: '20px' }} />
                    <a
                      style={{
                        width: '120px',
                        height: 'auto',
                        marginLeft: '5px',
                        color: 'white',
                        textDecoration: 'none',
                        cursor: 'text'
                      }}>
                      {item.originalFileName}
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="line" style={{ marginBottom: '50px' }}>
            .........
          </div>
        </div>
        <div>
          {currentTab === 1 ? (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <div className="main-field">
                    <h2 className="title_content">TIỂU SỬ</h2>
                  </div>
                  <p className="data_content">
                    {lecturer?.bio == '' || lecturer?.bio == null || lecturer?.bio == 'null' ? (
                      <p
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '-5px'
                        }}>
                        Chưa cập nhật
                      </p>
                    ) : (
                      lecturer?.bio
                    )}
                  </p>
                </div>
              </div>

              <ModalEditExpertises lecturer={lecturer} canEdit={false} />
              <ModalEditSubjectTeaching lecturer={lecturer} canEdit={false} />
              <ModalEditDegree lecturer={lecturer} canEdit={false} />
              <ModalEditWorkPosition lecturer={lecturer} canEdit={false} />
            </>
          ) : currentTab === 2 ? (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <div className='article-header-2'>
                    <h2 className="title_content" style={{ marginBottom: '15px', fontSize: "17px" }} ref={scrollTop}>
                      CÔNG BỐ KHOA HỌC
                    </h2>
                    <div>
                      <strong>{indexOfFirstItem}</strong> - <strong>{indexOfLastItem > totalPages ? totalPages : indexOfLastItem}</strong> <span>trên tổng số </span>
                      <strong>{totalPages}</strong>
                    </div>
                  </div>
                  <div>
                    {currentLecturers ? (
                      currentLecturers?.map((item: any) => <ArticleProfileCard data={item} />)
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
                          className="btn-pre-next"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}>
                          <FontAwesomeIcon
                            className="deleteicon"
                            fontSize={14}
                            icon={faArrowLeft}
                          />
                        </button>

                        {/* Page buttons */}
                        {renderPageButtons()}

                        {/* Next button */}
                        <button
                          className="btn-pre-next"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}>
                          <FontAwesomeIcon
                            className="deleteicon"
                            fontSize={14}
                            icon={faArrowRight}
                          />
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
              </div>
            </>
          ) : (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">HƯỚNG NGHIÊN CỨU</h2>
                  {lecturer?.researchFields == undefined ? (
                    <>
                      <span style={{ fontSize: '14px', fontStyle: 'italic' }}>Chưa cập nhật.</span>
                    </>
                  ) : (
                    <>
                      {lecturer?.researchFields.map((researchField: any) => (
                        <div style={{ marginBottom: '2px' }} key={researchField.id.toString()}>
                          <p className="data_content" style={{ marginBottom: '-5px' }}>
                            <FiberManualRecordIcon
                              style={{ fontSize: '9px', textAlign: 'center' }}
                            />{' '}
                            <span>{researchField.researchName}</span>
                            {researchField.note ? <span>({researchField.note})</span> : null}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <ModalEditBook lecturer={lecturer} canEdit={false} />
            </>
          )}
        </div>
      </div>
      <div className="footer"></div>
    </Styled>
  );
}

// git rebase origin/develop
// git add
// git stash

/**



 */
