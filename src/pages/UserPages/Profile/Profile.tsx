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
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
import ArticleCard from '../../../components/User/ArticleCard/ArticleCard';
import "./Profile.css";
import Avatar1 from 'react-avatar-edit'
import { editBioProfile } from '../../../api/Lecturer';
import { editAvatarProfile } from '../../../api/Lecturer';
import ModalEditInfoProfile from '../../../components/User/ModalLecturer/ModalEditInfoProfile/ModalEditInfoProfile';


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
        const data: Promise<Lecturer1> = getInfoProfile(accountId);
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

    const handleLinkArticleDetail = () => {
        window.location.replace('/profile/article-detail');
    };

    // ----  MODAL ----
    const [openBioModal, setOpenBioModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openEditAvatarModal, setOpenEditAvatarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newUniversity, setNewUniversity] = useState<string>("");

    const handleChangeUniversity = (event: any) => {
        setNewUniversity(event.target.value);
    };
    const optionsUniversity = [
        { value: "a", label: "Truong A" },
        { value: "b", label: "Truong B" },
        { value: "c", label: "Truong C" }
    ];

    const handleOkBio = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenBioModal(false);
        }, 3000);
        const newData: Lecturer1 | any = { ...lecturer };
        newData.bio = bio;
        editBioProfile(newData, accountId);
    };

    const handleCancelBio = () => {
        setOpenBioModal(false);
    };

    const handleOkInfo = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenEditProfile(false);
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

    const handleCancelEditAvatar = () => {
        setOpenEditProfile(false);
    };

    const onCrop = (view: string) => {
        console.log(view);
        editAvatarProfile(view, accountId);
    }

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
                        src={lecturer?.avatar == "http://image" ? "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" : lecturer?.avatar}
                        alt=""
                    />
                    <div className="name-profile">{lecturer?.name}</div>
                    <div className="line">.........</div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 className="field-profile">THÔNG TIN CÁ NHÂN</h4>
                        <div>
                            <div className="field-profile-info">
                                <PortraitIcon style={{ fontSize: '20px' }} />
                                <span style={{ marginLeft: '5px' }}>{lecturer?.currentDisciplines[0].position}</span>
                            </div>
                            <div className="field-profile-info">
                                <PlaceIcon style={{ fontSize: '20px' }} />
                                <span style={{ marginLeft: '5px' }}>
                                    {lecturer?.currentDisciplines[0].departmentName} - {lecturer?.currentDisciplines[0].universityName}
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
                                <span style={{ marginLeft: '5px' }}>{
                                    !email ? <>
                                        <span
                                            style={{
                                                fontSize: '13px',
                                                fontStyle: 'italic',
                                                marginLeft: '1px'
                                            }}>
                                            Chưa cập nhật
                                        </span>
                                    </> : email
                                }</span>
                            </div>
                            <div className="field-profile-info">
                                <PhoneAndroidIcon style={{ fontSize: '20px' }} />
                                <span style={{ marginLeft: '5px' }}>{
                                    !phone ? <>
                                        <span
                                            style={{
                                                fontSize: '13px',
                                                fontStyle: 'italic',
                                                marginLeft: '1px'
                                            }}>
                                            Chưa cập nhật
                                        </span>
                                    </> : phone
                                }</span>
                            </div>
                            <div className="field-profile-info">
                                <HouseIcon style={{ fontSize: '20px' }} />
                                <span style={{ marginLeft: '5px' }}>{
                                    !address ? <>
                                        <span
                                            style={{
                                                fontSize: '13px',
                                                fontStyle: 'italic',
                                                marginLeft: '1px'
                                            }}>
                                            Chưa cập nhật
                                        </span>
                                    </> : address
                                }</span>
                            </div>
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
                                <div className='header-edit-profile'>
                                    <h2>Ảnh đại diện</h2>
                                    <p onClick={() => setOpenEditAvatarModal(true)}>
                                        Chỉnh sửa
                                    </p>
                                </div>

                                <div className='content'>
                                    <img
                                        className="img-avatar-edit"
                                        src={lecturer?.avatar == "http://image" ? "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" : lecturer?.avatar}
                                        alt=""
                                    />
                                </div>

                                <Modal
                                    title="Chỉnh sửa thông tin tiểu sử"
                                    centered
                                    open={openEditAvatarModal}
                                    onOk={() => setOpenEditAvatarModal(false)}
                                    onCancel={() => setOpenEditAvatarModal(false)}
                                    width={700}
                                    className="modalStyle"
                                >
                                    <Avatar1
                                        width={400}
                                        height={300}
                                        onCrop={onCrop}
                                    />
                                </Modal>
                            </div>

                            <div>
                                <div className='header-edit-profile'>
                                    <h2>Thông tin cá nhân</h2>
                                    <p onClick={() => setOpenInfoModal(true)}>Chỉnh sửa</p>
                                </div>

                                <div className=''>
                                    <div>
                                        <div>
                                            <div className="field-profile-info">
                                                <PortraitIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>{lecturer?.currentDisciplines[0].position}</span>
                                            </div>
                                            <div className="field-profile-info">
                                                <PlaceIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>
                                                    {lecturer?.currentDisciplines[0].departmentName} - {lecturer?.currentDisciplines[0].universityName}
                                                </span>
                                            </div>
                                            <div className="field-profile-info">
                                                <WcIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>{lecturer?.gender}</span>
                                            </div>
                                            <div className="field-profile-info">
                                                <CalendarMonthIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>1977-05-03</span>
                                            </div>
                                            <div className="field-profile-info">
                                                <EmailIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>{
                                                    !email ? <>
                                                        <span
                                                            style={{
                                                                fontSize: '13px',
                                                                fontStyle: 'italic',
                                                                marginLeft: '1px'
                                                            }}>
                                                            Chưa cập nhật
                                                        </span>
                                                    </> : email
                                                }</span>
                                            </div>
                                            <div className="field-profile-info">
                                                <PhoneAndroidIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>{
                                                    !phone ? <>
                                                        <span
                                                            style={{
                                                                fontSize: '13px',
                                                                fontStyle: 'italic',
                                                                marginLeft: '1px'
                                                            }}>
                                                            Chưa cập nhật
                                                        </span>
                                                    </> : phone
                                                }</span>
                                            </div>
                                            <div className="field-profile-info">
                                                <HouseIcon style={{ fontSize: '24px' }} />
                                                <span style={{ marginLeft: '5px', fontSize: "16px" }}>{
                                                    !address ? <>
                                                        <span
                                                            style={{
                                                                fontSize: '13px',
                                                                fontStyle: 'italic',
                                                                marginLeft: '1px'
                                                            }}>
                                                            Chưa cập nhật
                                                        </span>
                                                    </> : address
                                                }</span>
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
                                            className="modalStyle"
                                        >
                                            <ModalEditInfoProfile props={lecturer} />
                                        </Modal>
                                    </div>
                                </div>
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
                                    {lecturer?.degrees.map((degree: any) => (
                                        <div style={{ marginBottom: "2px" }} key={degree.id.toString()}>
                                            <h4> <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> {degree.academicTitleName} ({degree.graduationDate.toString()}) { } {degree.graduationThesisName}</h4>
                                            <p className='data_content'>
                                                {degree.specialization}, {degree.universityName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="content-profile">
                                <div className="main_content">
                                    <h2 className="title_content">THỜI GIAN CÔNG TÁC</h2>
                                    {lecturer?.workPositions.map((workPosition: any) => (
                                        <div style={{ marginBottom: "2px" }} key={workPosition.id.toString()}>
                                            <p className='data_content' style={{ marginBottom: "-5px" }}>
                                                <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> {workPosition.fromDate.toString()}-{!workPosition.toDate ? "nay" : workPosition.toDate} - {workPosition.universityName ? workPosition.universityName : workPosition.company} - {workPosition.position}
                                            </p>
                                        </div>
                                    ))}
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
                                <div className="main_content">
                                    <h2 className="title_content">CÁC BÀI BÁO KHOA HỌC</h2>
                                    {articleList ? (
                                        articleList['1'].map((item: any) => <ArticleCard data={item} />)
                                    ) : (
                                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                                            Chưa có bài báo khoa học nào.
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : currentTab === 3 ? (
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
                    ) : (
                        <>
                            <div className="content-profile">
                                <div className="main_content">
                                    <h2 className="title_content">LĨNH VỰC CHUYÊN MÔN</h2>
                                    {lecturer?.expertises.map((expertise: any) => (
                                        <div style={{ marginBottom: "2px" }} key={expertise.id.toString()}>
                                            <p className='data_content' style={{ marginBottom: "-5px" }}>
                                                <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span style={{ fontWeight: "bolder" }}>{expertise.title}</span>: {expertise.specialization}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="content-profile">
                                <div className="main_content">
                                    <h2 className="title_content">HƯỚNG NGHIÊN CỨU</h2>
                                    {lecturer?.researchFields.map((researchField: any) => (
                                        <div style={{ marginBottom: "2px" }} key={researchField.id.toString()}>
                                            <p className='data_content' style={{ marginBottom: "-5px" }}>
                                                <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> <span>{researchField.researchName}</span>
                                                {researchField.note ? <span>({researchField.note})</span> : null}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="content-profile">
                                <div className="main_content">
                                    <h2 className="title_content">SÁCH</h2>
                                    {
                                        lecturer?.books.length == 0 ? <>
                                            <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                                                Chưa có bài báo khoa học nào.
                                            </span>
                                        </> : <>
                                            {lecturer?.books.map((book: any) => (
                                                <div style={{ marginBottom: "2px" }} key={book.id.toString()}>
                                                    <p className='data_content' style={{ marginBottom: "-5px" }}>
                                                        <div className="card_book">
                                                            <div className="name-book">
                                                                <p className="name">Sách: {book.name}</p>
                                                            </div>
                                                            <div className="user-field">Tác giả: {book.coAuthors}</div>
                                                            <div>Năm xuất bản: {book.publicYear}</div>
                                                        </div>
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </div>
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


/**
 


 */