import React, { useEffect, useState } from 'react';
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
import { getInfoProfile } from '../../../api/Lecturer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Button, Modal } from 'antd';
import { getArticlesOfLecturers } from '../../../api/Article';
import { useNavigate, useParams } from 'react-router-dom';
import httpStatus from 'http-status';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import "./LecturerDetail.css";
import Avatar1 from 'react-avatar-edit'
import { editBioProfile } from '../../../api/Lecturer';
import { editAvatarProfile } from '../../../api/Lecturer';
import { editNameProfile } from '../../../api/Lecturer';
import ModalEditInfoProfile from '../../../components/User/ModalLecturer/ModalEditInfoProfile/ModalEditInfoProfile';
import { toast } from 'react-toastify';
import ModalEditBook from '../../../components/User/ModalLecturer/ModalEditBook/ModalEditBook';
import ModalEditDegree from '../../../components/User/ModalLecturer/ModalEditDegree/ModalEditDegree';
import ModalEditWorkPosition from '../../../components/User/ModalLecturer/ModalEditWorkPosition/ModalEditWorkPosition';


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
  const token = localStorage.getItem('accessToken');
  const [articleList, setArticleList] = useState<Article[]>([]);
  const { id }: any = useParams();

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
        result.workPositions.map((workPosition: any) => {
          workPosition.isNow == 1 ? setCurrentPosition(workPosition) : null;
        });
        result.bio !== null ? setBio(result.bio) : setBio('');
        result.contacts.map((contact: any) => {
          if (contact.contactTypeName == "phone") {
            setPhone(contact.value);
          } else if (contact.contactTypeName == "address") {
            setAddress(contact.value);
          } else if (contact.contactTypeName == "email") {
            setEmail(contact.value);
          }
        })
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  const linkScopusProfile = '';

  console.log(lecturer);

  const handleTab1 = () => {
    setCurrentTab(1);
    document.getElementById('1')?.classList.add('tab-selected');
    document.getElementById('2')?.classList.remove('tab-selected');
    document.getElementById('3')?.classList.remove('tab-selected');
    document.getElementById('4')?.classList.remove('tab-selected');
  };

  const handleTab2 = () => {
    setCurrentTab(2);
    document.getElementById('2')?.classList.add('tab-selected');
    document.getElementById('1')?.classList.remove('tab-selected');
    document.getElementById('3')?.classList.remove('tab-selected');
    document.getElementById('4')?.classList.remove('tab-selected');
  };

  const handleTab3 = () => {
    setCurrentTab(3);
    document.getElementById('3')?.classList.add('tab-selected');
    document.getElementById('1')?.classList.remove('tab-selected');
    document.getElementById('2')?.classList.remove('tab-selected');
    document.getElementById('4')?.classList.remove('tab-selected');
  };

  const handleTab4 = () => {
    setCurrentTab(4);
    document.getElementById('4')?.classList.add('tab-selected');
    document.getElementById('1')?.classList.remove('tab-selected');
    document.getElementById('2')?.classList.remove('tab-selected');
    document.getElementById('3')?.classList.remove('tab-selected');
  };

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
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
            <div id="4" className="content_tab_name" onClick={handleTab4}>
              NGHIÊN CỨU
            </div>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="profile">
          <img
            className="img-avatar"
            src={lecturer?.avatar == null || lecturer?.avatar == "" || lecturer?.avatar == "data:image/png;base64," ? "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" : lecturer?.avatar}
            alt=""
          />
          <div className="name-profile">{lecturer?.name}</div>
          <div className="line">.........</div>
          <div style={{ textAlign: 'left' }}>
            <h4 className="field-profile">THÔNG TIN CÁ NHÂN</h4>
            <div>
              <div className="field-profile-info">
                <PortraitIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{
                  !lecturer?.currentDisciplines[0].position ? null : lecturer?.currentDisciplines[0].position
                }</span>
              </div>
              <div className="field-profile-info">
                <PlaceIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>
                  {lecturer?.currentDisciplines[0].departmentName} - {lecturer?.currentDisciplines[0].universityName}
                </span>
              </div>
              <div className="field-profile-info">
                <WcIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{
                  !lecturer?.gender ? <>
                    <span
                      style={{
                        fontSize: '13px',
                        fontStyle: 'italic',
                        marginLeft: '1px'
                      }}>
                      Chưa cập nhật
                    </span>
                  </> : lecturer?.gender
                }</span>
              </div>
              <div className="field-profile-info">
                <CalendarMonthIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{lecturer?.dateOfBirth}</span>
              </div>
              {
                !email ? null : <>
                  <div className="field-profile-info">
                    <EmailIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{
                      !email ? null : email
                    }</span>
                  </div>
                </>
              }
              {
                !phone ? null : <>
                  <div className="field-profile-info">
                    <PhoneAndroidIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{
                      !phone ? null : phone
                    }</span>
                  </div>
                </>
              }
              {
                !address ? null : <>
                  <div className="field-profile-info">
                    <HouseIcon style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '5px' }}>{
                      !address ? null : address
                    }</span>
                  </div>
                </>
              }
            </div>
          </div>

          <div className="line">.........</div>
          <div>
            <h4 className="field-profile">THÔNG TIN LIÊN QUAN</h4>
            <div className="field-profile-info">
              <AttachmentIcon style={{ fontSize: '20px' }} />
              <a style={{ marginLeft: '5px', color: "white", textDecoration: "none" }} href='https://www.facebook.com/namduonggggg' >fb.com/namduonggggg</a>
            </div>
          </div>

          <div className="line">.........</div>
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
                </div>
              </div>

              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">LĨNH VỰC CHUYÊN MÔN</h2>
                  {
                    lecturer?.expertises == undefined ? <>
                      <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                        Chưa cập nhật.
                      </span>
                    </> : <>
                      {lecturer?.expertises.map((expertise: any) => (
                        <div style={{ marginBottom: "2px" }} key={expertise.id.toString()}>
                          <p className='data_content' style={{ marginBottom: "-5px" }}>
                            <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span style={{ fontWeight: "bolder" }}>{expertise.title}</span>: {expertise.specialization}
                          </p>
                        </div>
                      ))}
                    </>
                  }
                </div>
              </div>

              <ModalEditDegree lecturer={lecturer} canEdit={false} />
              <ModalEditWorkPosition lecturer={lecturer} canEdit={false} />
            </>
          ) : currentTab === 2 ? (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content" style={{ marginBottom: "10px" }}>CÔNG BỐ KHOA HỌC</h2>
                  {articleList.length != 0 ? (
                    articleList[id].map((item: any) => <ArticleCard data={item} />)
                  ) : (
                    <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                      Chưa có bài báo khoa học nào.
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">HƯỚNG NGHIÊN CỨU</h2>
                  {
                    lecturer?.researchFields == undefined ? <>
                      <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                        Chưa cập nhật.
                      </span>
                    </> : <>
                      {lecturer?.researchFields.map((researchField: any) => (
                        <div style={{ marginBottom: "2px" }} key={researchField.id.toString()}>
                          <p className='data_content' style={{ marginBottom: "-5px" }}>
                            <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span>{researchField.researchName}</span>
                            {researchField.note ? <span>({researchField.note})</span> : null}
                          </p>
                        </div>
                      ))}
                    </>
                  }

                </div>
              </div>

              <ModalEditBook lecturer={lecturer} canEdit={false} />
            </>
          )}
        </div>
      </div >
      <div className="footer"></div>
    </Styled >
  );
}

// git rebase origin/develop
// git add
// git stash


/**
 


 */