import React, { useEffect, useState } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WcIcon from '@mui/icons-material/Wc';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PortraitIcon from '@mui/icons-material/Portrait';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SettingsIcon from '@mui/icons-material/Settings';
import { getInfoProfile } from '../../../api/Lecturer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Button, Modal } from 'antd';
import { getArticlesOfLecturers } from '../../../api/Article';
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';

interface academicTitle {
  lecturerId: Number;
  id: Number;
  name: String;
}

interface activity {
  activityName: String;
  activityTypeName: String;
  fromDate: Number;
  id: Number;
  isNow: Number;
  lecturerId: Number;
  note: String;
  toDate: null;
}

interface book {
  coAuthors: String;
  id: Number;
  lecturerId: Number;
  name: String;
  projectId: null;
  pseudonym: null;
  publicYear: Number;
  publisherName: String;
}

interface currentDiscipline {
  departmentName: String;
  id: Number;
  lecturerId: Number;
  position: String;
  universityName: String;
}

interface degree {
  academicTitleName: String;
  graduationDate: Number;
  graduationThesisName: null;
  id: Number;
  lecturerId: Number;
  specialization: String;
  universityName: String;
}

interface expertise {
  id: Number;
  lecturerId: Number;
  specialization: String;
  title: String;
}

interface phdThesise {
  graduationYear: String;
  id: Number;
  lecturerId: Number;
  note: null;
  phdName: String;
  projectName: String;
}

interface project {
  acceptanceDate: Date;
  expenditure: Number;
  fromDate: String;
  id: Number;
  lecturerId: Number;
  name: String;
  note: null;
  projectCode: String;
  projectRole: String;
  reference: null;
  result: String;
  toDate: String;
}

interface researchField {
  id: Number;
  lecturerId: Number;
  note: String;
  researchName: String;
}

interface workPosition {
  company: null;
  fromDate: Number;
  id: Number;
  isNow: Number;
  lecturerId: Number;
  position: String;
  toDate: null;
  universityName: String;
}

interface Lecturer {
  academicRankGainYear: Number;
  academicRankId: Number;
  academicTitleGainYear: Number;
  academicTitleId: Number;
  academicTitles: academicTitle[];
  activities: activity[];
  avatar: String;
  bio: string;
  books: book[];
  currentDisciplines: currentDiscipline[];
  dateOfBirth: string;
  degrees: degree[];
  expertises: expertise[];
  gender: String;
  id: Number;
  name: String;
  phdThesises: phdThesise[];
  projects: project[];
  researchFields: researchField[];
  workPositions: workPosition[];
}

type Article = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);
  const [lecturer, setLecturer] = useState<Lecturer>();
  const [currentPosition, setCurrentPosition] = useState<workPosition>();
  const [bio, setBio] = useState<string>('');
  const accountId: string | null = localStorage.getItem('accountId');
  const token = localStorage.getItem('accessToken');
  const [articleList, setArticleList] = useState<Article[]>();

  const fetchArticle = async () => {
    let param = {
      data: {
        lecturerIds: [Number(accountId)]
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
    const data: Promise<Lecturer> = getInfoProfile(accountId);
    data
      .then((result) => {
        setLecturer(result);
        result.workPositions.map((workPosition) => {
          workPosition.isNow == 1 ? setCurrentPosition(workPosition) : null;
        });
        result.bio !== null ? setBio(result.bio) : setBio('');
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  const linkScopusProfile = '';

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
    window.location.replace('http://localhost:5000/');
  };

  const handleLinkArticleDetail = () => {
    window.location.replace('/profile/article-detail');
  };

  // ----  MODAL ----
  const [openBioModal, setOpenBioModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOkBio = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenBioModal(false);
    }, 3000);
  };

  const handleCancelBio = () => {
    setOpenBioModal(false);
  };

  const handleOkInfo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenInfoModal(false);
    }, 3000);
  };

  const handleCancelInfo = () => {
    setOpenInfoModal(false);
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
              BÀI BÁO KHOA HỌC
            </div>
          </li>
          <li className="content_tab">
            <div id="3" className="content_tab_name" onClick={handleTab3}>
              SCOPUS PROFILE
            </div>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="profile">
          <img
            className="img-avatar"
            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
            alt=""
          />
          <div className="name-profile">{lecturer?.name}</div>
          <div className="line">.........</div>
          <div style={{ textAlign: 'left' }}>
            <h4 className="field-profile">THÔNG TIN CÁ NHÂN</h4>
            <div>
              <div className="field-profile-info">
                <PortraitIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{currentPosition?.position}</span>
              </div>
              <div className="field-profile-info">
                <PlaceIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {!currentPosition?.universityName
                    ? currentPosition?.company
                    : currentPosition.universityName}
                </span>
              </div>
              <div className="field-profile-info">
                <WcIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{lecturer?.gender}</span>
              </div>
              <div className="field-profile-info">
                <CalendarMonthIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{lecturer?.dateOfBirth}</span>
              </div>
              <div className="field-profile-info">
                <EmailIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>dnam@hcmus.edu.vn</span>
              </div>
              <div className="field-profile-info">
                <PhoneAndroidIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>038-223-334</span>
              </div>
            </div>
          </div>

          <div className="line">.........</div>
          <div>
            <h4 className="field-profile">THÔNG TIN LIÊN QUAN</h4>
            <div className="field-profile-info">
              <AttachmentIcon style={{ fontSize: '20px' }} />
              <a style={{ marginLeft: '5px' }}>fb.com/namduonggg</a>
            </div>
            <div className="field-profile-info">
              <AttachmentIcon style={{ fontSize: '20px' }} />
              <a style={{ marginLeft: '5px' }}>linked.in/namduong</a>
            </div>
          </div>

          <div className="line">.........</div>
          <div className="edit-profile">
            <div style={{ marginLeft: '15px' }}>
              <SettingsIcon style={{ fontSize: '23px' }} />
            </div>
            <div className="btn-edit-profile" onClick={() => setOpenInfoModal(true)}>
              Chỉnh sửa thông tin cá nhân
            </div>

            <Modal
              title="Chỉnh sửa thông tin tiểu sử"
              centered
              open={openInfoModal}
              onOk={() => setOpenInfoModal(false)}
              onCancel={() => setOpenInfoModal(false)}
              width={700}
              footer={[
                <Button key="back" onClick={handleCancelInfo}>
                  Quay lại
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOkInfo}>
                  Lưu
                </Button>
              ]}></Modal>
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
                    {bio == '' ? (
                      <p
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '-5px'
                        }}>
                        Chưa cập nhật
                      </p>
                    ) : (
                      bio
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

              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">BẰNG CẤP</h2>
                  {/* {lecturer?.degrees.map((degree: degree) => (
                                      <div style={{ marginBottom: "2px" }} key={degree.id.toString()}>
                                          <h4> <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> {degree.academicTitleName} ({degree.graduationDate.toString()}) { } {degree.graduationThesisName}</h4>
                                          <p className='data_content'>
                                              {degree.specialization}, {degree.universityName}
                                          </p>
                                      </div>
                                  ))} */}
                </div>
              </div>

              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">KHẢ NĂNG</h2>
                  <p className="data_content">
                    Dự án hợp tác Tham gia một hội thảo trên web với tư cách là người tham gia hội
                    thảo hoặc diễn giả Thành viên của một ủy ban cố vấn
                  </p>
                </div>
              </div>
            </>
          ) : currentTab === 2 ? (
            <>
              <div className="content-profile">
                {articleList ? (
                  articleList['1'].map((item: any) => <ArticleCard data={item} />)
                ) : (
                  <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                    Chưa có bài báo khoa học nào.
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="content-profile">
                <span style={{ fontSize: '14px' }}>
                  {linkScopusProfile === '' ? (
                    <div className="scopus-profile">
                      <button className="btn btn-add-profile">Connect Scopus profile</button>
                      <p>
                        If you have more than one Scopus author profile and/or there are mistakes in
                        your profile, please go to the&nbsp;
                        <a href="https://www.scopus.com/feedback/author/home.uri">
                          Scopus Author Feedback Wizard
                        </a>
                        &nbsp;to request a correction
                      </p>
                    </div>
                  ) : (
                    <div className="scopus-profile link">
                      <h3>Link to Scopus Profile: </h3>
                      <a href={linkScopusProfile}>{linkScopusProfile}</a>
                    </div>
                  )}
                </span>
              </div>
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
