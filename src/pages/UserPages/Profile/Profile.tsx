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
import { object } from 'yup';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import { getArticlesOfLecturers } from '../../../api/Article';

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
  isNow: String;
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
  const [infoProfile, setInfoProfile] = useState(
    "Melita Grant chuyên về quản lý tổng hợp tài nguyên nước (IWRM) và nước, vệ sinh môi trường và vệ sinh (WASH) trong phát triển quốc tế, tập trung vào bình đẳng giới và hòa nhập. Cô đã làm việc trong các chính phủ, trường đại học và các tổ chức xã hội dân sự. Với nền tảng học vấn về Khoa học Chính trị và Quản lý Môi trường, Melita có chuyên môn về quản lý nước và phát triển chính sách, đồng thời đã áp dụng điều này trong bối cảnh Úc, Đông Nam Á và Nam Á. Melita có nền tảng kỹ thuật trong việc áp dụng các khuôn khổ bao gồm; chính sách quản lý nước nông thôn; các công nghệ, hành vi và chính sách quản lý nhu cầu và bảo tồn nước đô thị; chính trị nước xuyên biên giới; và quản lý tài nguyên nước tổng hợp thông qua các vai trò tại Văn phòng Nước NSW, Văn phòng Bộ trưởng Bộ Nước NSW và chính quyền địa phương.đã lãnh đạo một số dự án về bình đẳng giới và hòa nhập xã hội, bao gồm Phần Hành động về Giới cho Đối tác Nước Toàn cầu, và là tác giả của một ấn phẩm có tiêu đề, 'Bình đẳng giới và Mục tiêu 6 - Kết nối quan trọng' cho Đối tác Nước Úc. Cô hiện đang lãnh đạo một dự án nghiên cứu kéo dài nhiều năm ở Timor-Leste, Campuchia và Indonesia, và đã lãnh đạo một số sáng kiến nghiên cứu tập trung vào quản lý nước nông thôn ở Khu vực sông Mê Kông. Melita có nhiều kinh nghiệm trong việc thiết kế, thực hiện và đánh giá sự tham gia của các bên liên quan và cộng đồng trong các tổ chức xã hội dân sự, đồng thời đã tổng hợp và dịch nghiên cứu thành các khuyến nghị thực hành và chính sách thiết thực và khả thi cho xã hội dân sự và các chủ thể chính phủ."
  );
  const [lecturer, setLecturer] = useState<Lecturer>();
  const token = localStorage.getItem('tokenAccess');
  const [articleList, setArticleList] = useState<Article[]>([]);

  const fetchArticle = async () => {
    let id = '1';
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
    const data: Promise<Lecturer> = getInfoProfile();
    data
      .then((result) => {
        setLecturer(result);
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  console.log(lecturer);
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

  const handleEditProfile = () => {
    console.log('edit');
  };

  function btnSave() {}

  const handleEditBio = (e: any) => {
    const bio = document.getElementsByClassName('data_content')[0];
    var y = document.createElement('TEXTAREA');
    var butt = document.createElement('BUTTON');
    var buttext = document.createTextNode('Lưu');
    butt.onclick = btnSave;
    butt.appendChild(buttext);

    var obj = e.target;
    var z = obj.parentNode.parentNode;
    z.insertBefore(y, bio);
    z.insertBefore(butt, bio);
    z.removeChild(bio);
    y.innerHTML = infoProfile;
    y.classList.add('text-area');
    butt.classList.add('btn-save-profile');
  };

  const handleLinkArticleDetail = () => {
    window.location.replace('/profile/article-detail');
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
                <span style={{ marginLeft: '5px' }}>Giảng viên đại học</span>
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
              <div className="field-profile-info">
                <PlaceIcon style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>Trường ĐH Khoa học Tự Nhiên - TPHCM</span>
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
            <div className="btn-edit-profile" onClick={handleEditProfile}>
              Chỉnh sửa thông tin cá nhân
            </div>
          </div>
        </div>
        <div>
          {currentTab === 1 ? (
            <>
              <div className="content-profile">
                <div className="main_content">
                  <div className="main-field">
                    <h2 className="title_content">TIỂU SỬ</h2>
                    {!token ? <button onClick={handleEditBio}>Chỉnh sửa</button> : null}
                  </div>
                  <p className="data_content">
                    Melita Grant chuyên về quản lý tổng hợp tài nguyên nước (IWRM) và nước, vệ sinh
                    môi trường và vệ sinh (WASH) trong phát triển quốc tế, tập trung vào bình đẳng
                    giới và hòa nhập. Cô đã làm việc trong các chính phủ, trường đại học và các tổ
                    chức xã hội dân sự. Với nền tảng học vấn về Khoa học Chính trị và Quản lý Môi
                    trường, Melita có chuyên môn về quản lý nước và phát triển chính sách, đồng thời
                    đã áp dụng điều này trong bối cảnh Úc, Đông Nam Á và Nam Á. Melita có nền tảng
                    kỹ thuật trong việc áp dụng các khuôn khổ bao gồm; chính sách quản lý nước nông
                    thôn; các công nghệ, hành vi và chính sách quản lý nhu cầu và bảo tồn nước đô
                    thị; chính trị nước xuyên biên giới; và quản lý tài nguyên nước tổng hợp thông
                    qua các vai trò tại Văn phòng Nước NSW, Văn phòng Bộ trưởng Bộ Nước NSW và chính
                    quyền địa phương.
                    <br></br> đã lãnh đạo một số dự án về bình đẳng giới và hòa nhập xã hội, bao gồm
                    Phần Hành động về Giới cho Đối tác Nước Toàn cầu, và là tác giả của một ấn phẩm
                    có tiêu đề, 'Bình đẳng giới và Mục tiêu 6 - Kết nối quan trọng' cho Đối tác Nước
                    Úc. Cô hiện đang lãnh đạo một dự án nghiên cứu kéo dài nhiều năm ở Timor-Leste,
                    Campuchia và Indonesia, và đã lãnh đạo một số sáng kiến nghiên cứu tập trung vào
                    quản lý nước nông thôn ở Khu vực sông Mê Kông. Melita có nhiều kinh nghiệm trong
                    việc thiết kế, thực hiện và đánh giá sự tham gia của các bên liên quan và cộng
                    đồng trong các tổ chức xã hội dân sự, đồng thời đã tổng hợp và dịch nghiên cứu
                    thành các khuyến nghị thực hành và chính sách thiết thực và khả thi cho xã hội
                    dân sự và các chủ thể chính phủ.
                    <br></br>Làm việc tại Khoa Kinh tế Chính trị tại Đại học Sydney, Melita đã giảng
                    dạy 'Quyền con người trong Phát triển Quốc tế' cho các sinh viên Cao học vào năm
                    2010. Cô có bằng Cử nhân Nghệ thuật - Chính phủ (Hạng nhất danh dự) của Đại học
                    Sydney và bằng Thạc sĩ Môi trường từ Đại học Melbourne. Melita là Đồng Chủ tịch
                    của Nhóm Tham khảo WASH của Úc, thành viên của Hội đồng Đánh giá Chuyên gia của
                    Hiệp hội Nước Úc, và là Thành viên Hội đồng của Mạng lưới Nghệ thuật & Công nghệ
                    Úc (ANAT).
                  </p>
                </div>
              </div>

              <div className="content-profile">
                <div className="main_content">
                  <h2 className="title_content">BẰNG CẤP</h2>
                  {/* {lecturer?.degrees.map((degree: degree) => (
                    <div style={{ marginBottom: '2px' }} key={degree.id.toString()}>
                      <h4>
                        {' '}
                        <FiberManualRecordIcon
                          style={{ fontSize: '9px', textAlign: 'center' }}
                        />{' '}
                        {degree.academicTitleName} ({degree.graduationDate.toString()}) {}{' '}
                        {degree.graduationThesisName}
                      </h4>
                      <p className="data_content">
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
                {/* <span style={{ fontSize: "14px", fontStyle: "italic" }}>Chưa có bài báo khoa học nào.</span> */}
                <div>{articleList && articleList.map((item) => <ArticleCard data={item} />)}</div>
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
