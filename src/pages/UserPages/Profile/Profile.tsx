// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react';
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
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Modal } from 'antd';
import {
  exportExcelArticles,
  exportExcelBriefArticles,
  getArticlesOfLecturers
} from '../../../api/Article';
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
import ArticleProfileCard from '../../../components/User/ArticleProfileCard/ArticleProfileCard';
import './Profile.css';
import Avatar1 from 'react-avatar-edit';
import {
  editBioProfile,
  editAvatarProfile,
  editNameProfile,
  editLinkProfile,
  deleteFileLecturer,
  getInfoProfile,
  uploadFileLecturer
} from '../../../api/Lecturer';
import ModalEditExpertises from '../../../components/User/ModalLecturer/ModalEditExpertises/ModalEditExpertises';
import ModalEditInfoProfile from '../../../components/User/ModalLecturer/ModalEditInfoProfile/ModalEditInfoProfile';
import ModalEditBook from '../../../components/User/ModalLecturer/ModalEditBook/ModalEditBook';
import ModalEditDegree from '../../../components/User/ModalLecturer/ModalEditDegree/ModalEditDegree';
import ModalEditResearchField from '../../../components/User/ModalLecturer/ModalEditResearchField/ModalEditResearchField';
import ModalEditWorkPosition from '../../../components/User/ModalLecturer/ModalEditWorkPosition/ModalEditWorkPosition';
import ModalEditSubjectTeaching from '../../../components/User/ModalLecturer/ModalEditSubjectTeaching/ModalEditSubjectTeaching';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FileUpload from '../../../components/FileUpload';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import ExportExcelModal from '../../../components/ExportExcelModal';
import PDFReader from '../../../components/PDFReader';
import { isEmpty } from 'lodash-es';

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

type Lecturer1 = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);
  const [lecturer, setLecturer] = useState<Lecturer1>();
  const [currentPosition, setCurrentPosition] = useState<any>();
  const [bio, setBio] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [addressId, setAddressId] = useState<string>('');
  const [linkId, setLinkId] = useState<string>('');
  const [phoneId, setPhoneId] = useState<string>('');
  const [currentDisciplineId, setCurrentDisciplineId] = useState<any>();
  const [linkInner, setLinkInner] = useState<string>('');
  const accountId = localStorage.getItem('accountId');
  const lecturerId = localStorage.getItem('lecturerId');
  const token = localStorage.getItem('accessToken');
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
  );
  console.log('🚀 ~ file: Profile.tsx:78 ~ Profile ~ previewAvatar:', previewAvatar);
  const [lecturerFiles, setLecturerFiles] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [file, setFile] = useState<any>();
  const [reload, setReload] = useState<boolean>(false);
  console.log('🚀 ~ file: Profile.tsx:79 ~ Profile ~ reload:', reload);

  // ----  MODAL ----
  const [openBioModal, setOpenBioModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditAvatarModal, setOpenEditAvatarModal] = useState(false);
  const [openEditNameModal, setOpenEditNameModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState<string | undefined>();
  const [openExportModal, setOpenExportModal] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const fetchArticle = async () => {
    let param = {
      data: {
        lecturerIds: [Number(lecturerId)]
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

  const getInfoLecturer = useCallback(() => {
    getInfoProfile(lecturerId)
      .then((result) => {
        setLecturer(result);
        setEmail(result.contacts[0].value);
        setAddress(result.contacts[1].value);
        setPhone(result.contacts[2].value);
        setLink(result.contacts[3].value);

        setEmailId(result.contacts[0]);
        setAddressId(result.contacts[1]);
        setPhoneId(result.contacts[2]);
        setLinkId(result.contacts[3]);
        setCurrentDisciplineId(result.currentDisciplines[0]);
        if (!isEmpty(result.avatar)) {
          setPreviewAvatar(result.avatar);
        }
        setLecturerFiles(result.lecturerFiles);

        if (result.contacts[3]?.value.length >= 25) {
          setLinkInner(result.contacts[3].value.slice(0, 25) + '...');
        } else {
          setLinkInner(result.contacts[3].value);
        }
        result?.workPositions?.map((workPosition: any) => {
          workPosition.isNow === 1 ? setCurrentPosition(workPosition) : null;
        });
        result.bio !== null || result.bio !== 'null' ? setBio(result.bio) : setBio('');
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, [lecturerId]);

  const handleUploadFile = useCallback(async () => {
    const { data } = await uploadFileLecturer(files, lecturerId);
    if (data.code === 0) {
      toast.success(data.message);
      setOpenLinkModal(false);
      await getInfoLecturer();
    } else {
      toast.error(data.message);
    }
  }, [files, lecturerId, getInfoLecturer]);

  const handleDeleteLecturerFile = useCallback(
    async (fileId) => {
      const { data } = await deleteFileLecturer(fileId, lecturerId);
      if (data.code === 0) {
        toast.success(data.message);
        await getInfoLecturer();
      } else {
        toast.error(data.message);
      }
    },
    [lecturerId]
  );

  const handleUploadProfile = useCallback(async () => { }, []);

  useEffect(() => {
    fetchArticle();
  }, []);

  useEffect(() => {
    getInfoLecturer();
  }, [getInfoLecturer, reload]);

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
    navigate('/search');
  };

  const handleLinkArticleDetail = () => {
    window.location.replace('/profile/article-detail');
  };

  const handleOkBio = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenBioModal(false);
    }, 3000);
    const newData: Lecturer1 | any = { ...lecturer };
    newData.bio = bio;
    await editBioProfile(newData, lecturerId);
    window.location.reload();
  };

  const handleCancelBio = () => {
    setOpenBioModal(false);
  };

  const handleOkInfo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEditProfile(false);
      window.location.reload();
    }, 3000);
  };

  const handleCancelInfo = () => {
    setOpenEditProfile(false);
  };

  const handleOkEditAvatar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEditProfile(false);
    }, 3000);
  };

  const onCrop = async (view: string) => {
    console.log('🚀 ~ file: Profile.tsx:251 ~ onCrop ~ view:', view);
    setPreviewAvatar(view);
    await editAvatarProfile(lecturer, view, lecturerId);
  };

  const handleSaveName = async () => {
    await editNameProfile(lecturer, newName, lecturerId);
    window.location.reload();
  };

  const handleSaveLink = async () => {
    await editLinkProfile(lecturer, link, lecturerId);
    window.location.reload();
  };

  // PAGINATION ARTICLES
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisibleButtons = 5;
  const scrollTop = useRef<HTMLDivElement>(null);
  const listArticle = articleList ? Object.values(articleList) : [];
  const arr = listArticle[0];

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

  const handleExport = async (selectedYear: any) => {
    await exportExcelArticles(selectedYear);
    setOpenExportModal(false);
  };

  const handleExportBrief = async (selectedYear: any) => {
    await exportExcelBriefArticles(selectedYear);
    setOpenExportModal(false);
  };

  const handleChangeItemsPerPage = (event: any) => {
    if (scrollTop.current) {
      scrollTop.current.scrollIntoView({ behavior: 'smooth' });
    }

    setItemsPerPage(event.target.value);
  };

  return (
    <Styled>
      <div className="header_topbar">
        <div className="btn-back-search" onClick={handleBackSearch}>
          <ArrowBackIcon /> quay lại trang tìm kiếm{' '}
        </div>
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
              lecturer?.avatar === null ||
                lecturer?.avatar === '' ||
                lecturer?.avatar === 'data:image/png;base64,'
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
                  {lecturer?.currentDisciplines === undefined ? (
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
                  {lecturer?.currentDisciplines === undefined ? (
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
                      {lecturer?.currentDisciplines[0].departmentName && (
                        <>
                          {lecturer.currentDisciplines[0].departmentName} -{' '}
                          {lecturer.currentDisciplines[0].universityName}
                        </>
                      )}
                      {!lecturer?.currentDisciplines[0].departmentName && (
                        <>{lecturer.currentDisciplines[0].universityName}</>
                      )}
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
              <div className="field-profile-info">
                <EmailIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {!email ? (
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
                    email
                  )}
                </span>
              </div>
              {/* <div className="field-profile-info">
                <PhoneAndroidIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {!phone ? (
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
                    phone
                  )}
                </span>
              </div> */}
              <div className="field-profile-info">
                <HouseIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {!address ? (
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
                    address
                  )}
                </span>
              </div>
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
                        textDecoration: 'none'
                      }}
                      href={item.filePath}
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.originalFileName}
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="line">.........</div>
          <div className="edit-profile">
            <div style={{ marginLeft: '15px' }}>
              <SettingsIcon style={{ fontSize: '23px' }} />
            </div>
            <div className="btn-edit-profile" onClick={() => setOpenEditProfile(true)}>
              Chỉnh sửa thông tin cá nhân
            </div>

            <Modal
              title="Chỉnh sửa thông tin tiểu sử"
              centered
              open={openEditProfile}
              onOk={() => setOpenEditProfile(false)}
              onCancel={() => setOpenEditProfile(false)}
              width={700}
              className="modalStyle"
              footer={[
                <Button key="back" onClick={handleCancelInfo}>
                  Quay lại
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOkInfo}>
                  Lưu
                </Button>
              ]}>
              <div>
                <div className="header-edit-profile">
                  <h2>
                    Tên tài khoản:{' '}
                    <span style={{ marginLeft: '5px', fontSize: '18px' }}>{lecturer?.name}</span>
                  </h2>
                  <p onClick={() => setOpenEditNameModal(true)}>Chỉnh sửa</p>
                </div>

                <Modal
                  title="Chỉnh sửa tên tài khoản"
                  centered
                  open={openEditNameModal}
                  onOk={handleSaveName}
                  onCancel={() => setOpenEditNameModal(false)}
                  width={700}
                  className="modalStyle">
                  <div className="group">
                    <input
                      required
                      type="text"
                      className="input-edit-profile"
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                    <span className="highlight-edit-profile"></span>
                    <span className="bar-edit-profile"></span>
                    <label className="label-edit-profile">Tên tài khoản</label>
                  </div>
                </Modal>
              </div>

              <div>
                <div className="header-edit-profile">
                  <h2>Ảnh đại diện</h2>
                  <p onClick={() => setOpenEditAvatarModal(true)}>Chỉnh sửa</p>
                </div>

                <div
                  className="content"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <img className="img-avatar-edit" src={previewAvatar} alt="" />
                </div>

                <Modal
                  title="Thay đổi ảnh đại diện"
                  centered
                  open={openEditAvatarModal}
                  onOk={() => setOpenEditAvatarModal(false)}
                  onCancel={() => setOpenEditAvatarModal(false)}
                  width={700}
                  className="modalStyle">
                  <Avatar1 width={200} height={200} onCrop={(e) => onCrop(e)} />
                </Modal>
              </div>

              <div>
                <div className="header-edit-profile">
                  <h2>Thông tin cá nhân</h2>
                  <p onClick={() => setOpenInfoModal(true)}>Chỉnh sửa</p>
                </div>

                <div className="">
                  <div>
                    <div>
                      <div className="field-profile-info">
                        <PortraitIcon style={{ fontSize: '24px' }} />
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
                        <PlaceIcon style={{ fontSize: '24px' }} />
                        <span style={{ marginLeft: '5px', fontSize: '16px' }}>
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
                        <WcIcon style={{ fontSize: '24px' }} />
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
                      <div className="field-profile-info">
                        <CalendarMonthIcon style={{ fontSize: '24px' }} />
                        <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                          {lecturer?.dateOfBirth}
                        </span>
                      </div>
                      <div className="field-profile-info">
                        <EmailIcon style={{ fontSize: '24px' }} />
                        <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                          {!email ? (
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
                            email
                          )}
                        </span>
                      </div>
                      <div className="field-profile-info">
                        <PhoneAndroidIcon style={{ fontSize: '24px' }} />
                        <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                          {!phone ? (
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
                            phone
                          )}
                        </span>
                      </div>
                      <div className="field-profile-info">
                        <HouseIcon style={{ fontSize: '24px' }} />
                        <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                          {!address ? (
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
                            address
                          )}
                        </span>
                      </div>
                    </div>

                    <Modal
                      title="Chỉnh sửa thông tin cá nhân"
                      centered
                      open={openInfoModal}
                      //onOk={() => setOpenInfoModal(false)}
                      onCancel={() => setOpenInfoModal(false)}
                      footer={null}
                      width={700}
                      className="modalStyle">
                      <ModalEditInfoProfile props={lecturer} />
                    </Modal>
                  </div>
                </div>
              </div>

              <div>
                <div className="header-edit-profile">
                  <h2>Thông tin bổ sung</h2>
                  <p onClick={() => setOpenLinkModal(true)}>Chỉnh sửa</p>
                </div>

                <div>
                  <div className="field-profile-info">
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
                              textDecoration: 'none'
                            }}
                            href={item.filePath}
                            target="_blank"
                            rel="noopener noreferrer">
                            {item.originalFileName}
                          </a>
                          <DeleteIcon
                            style={{ fontSize: '20px', marginLeft: '5px', cursor: 'pointer' }}
                            onClick={() => handleDeleteLecturerFile(item.id)}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <Modal
                  title="Chỉnh sửa thông tin"
                  centered
                  open={openLinkModal}
                  onOk={() => handleUploadFile()}
                  onCancel={() => setOpenLinkModal(false)}
                  width={700}
                  className="modalStyle">
                  <div className="group">
                    <FileUpload files={files} setFiles={setFiles} />
                    {files.map((file: any, index: any) => (
                      <p className="file" key={index}>
                        {file?.name}
                      </p>
                    ))}
                  </div>
                </Modal>
              </div>
              <div>
                <div className="header-edit-profile">
                  <h2>Cập nhật thông tin cá nhân</h2>
                </div>
                <PDFReader
                  setOpenEditProfile={setOpenEditProfile}
                  email={emailId}
                  phone={phoneId}
                  address={addressId}
                  link={linkId}
                  currentDiscipline={currentDisciplineId}
                  reload={reload}
                  setReload={setReload}
                  avatar={previewAvatar}
                />
              </div>
            </Modal>
          </div>
        </div>
        <div>
          {currentTab === 1 ? (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <div className="main-field">
                    <h2 className="title_content">TIỂU SỬ</h2>
                    {token ? (
                      <button onClick={() => setOpenBioModal(true)}>Chỉnh sửa</button>
                    ) : null}
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

                  <Modal
                    title="Chỉnh sửa thông tin tiểu sử"
                    centered
                    open={openBioModal}
                    onOk={() => setOpenBioModal(false)}
                    onCancel={() => setOpenBioModal(false)}
                    width={700}
                    footer={[
                      <Button key="back" onClick={handleCancelBio}>
                        Quay lại
                      </Button>,
                      <Button key="submit" type="primary" loading={loading} onClick={handleOkBio}>
                        Lưu
                      </Button>
                    ]}>
                    <textarea
                      className="text-area"
                      placeholder="Viết tiểu sử bạn ở đây ... "
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      style={{
                        backgroundColor: '#dddddd',
                        color: '#666666',
                        padding: '1em',
                        borderRadius: '10px',
                        border: '2px solid transparent',
                        outline: 'none',
                        fontFamily: "'Heebo', sans-serif",
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '1.4',
                        width: '600px',
                        height: '200px',
                        transform: 'all 0.2s',
                        marginLeft: '25px',
                        marginTop: '10px'
                      }}></textarea>
                  </Modal>
                </div>
              </div>
              <ModalEditExpertises lecturer={lecturer} canEdit={true} />
              <ModalEditSubjectTeaching
                lecturer={lecturer}
                canEdit={true}
                getInfoLecturer={getInfoLecturer}
              />
              <ModalEditDegree lecturer={lecturer} canEdit={true} />
              <ModalEditWorkPosition lecturer={lecturer} canEdit={true} />
            </>
          ) : currentTab === 2 ? (
            <>
              <div className="add-article-container" ref={scrollTop}>
                <ExportExcelModal
                  visible={openExportModal}
                  onClose={() => setOpenExportModal(false)}
                  onExport={handleExport}
                  onExportBrief={handleExportBrief}
                />
              </div>

              <div className="content-profile" style={{ marginTop: '-20px' }}>
                <div className="article-header-2">
                  <h2
                    className="title_content"
                    style={{ marginBottom: '15px', fontSize: '17px' }}
                    ref={scrollTop}>
                    CÔNG BỐ KHOA HỌC
                  </h2>
                  <div>
                    <strong>{indexOfFirstItem}</strong> -{' '}
                    <strong>{indexOfLastItem > totalPages ? totalPages : indexOfLastItem}</strong>{' '}
                    <span>trên tổng số </span>
                    <strong>{totalPages}</strong>
                  </div>
                </div>
                {currentLecturers ? (
                  currentLecturers?.map((item: any) => <ArticleProfileCard data={item} />)
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: '14px',
                        marginTop: '10px',
                        fontStyle: 'italic'
                        // marginLeft: '-70px'
                      }}>
                      Không tìm thấy bài báo khoa học nào!
                    </div>
                  </>
                )}

                <div style={{ position: 'relative' }}>
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

                  <div
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    className="dropdown-perpage">
                    <select id="dropdown" value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                      <option value={10}>10 / trang</option>
                      <option value={20}>20 / trang</option>
                      <option value={50}>50 / trang</option>
                      <option value={100}>100 / trang</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ModalEditResearchField lecturer={lecturer} canEdit={true} />
              <ModalEditBook lecturer={lecturer} canEdit />
            </>
          )}
        </div>
      </div>
      <div className="footer"></div>
    </Styled>
  );
}
