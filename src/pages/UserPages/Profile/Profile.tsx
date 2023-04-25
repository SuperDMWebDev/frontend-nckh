import React, { useEffect, useState } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PlaceIcon from '@mui/icons-material/Place';
import PortraitIcon from '@mui/icons-material/Portrait';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SettingsIcon from '@mui/icons-material/Settings';
import { getInfoProfile } from '../../../api/Lecturer';

export default function Profile() {
    const [currentTab, setCurrentTab] = useState(1);
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

    useEffect(() => {
        getInfoProfile();
    }, []);

    const handleBackSearch = () => {
        window.location.replace('http://localhost:5000/');
    };

    return (
        <Styled>
            <div className='header_topbar'>
                <div className='btn-back-search' onClick={handleBackSearch}><ArrowBackIcon /> quay lại trang tìm kiếm </div>
                <ul className='header_tab'>
                    <li className='content_tab'>
                        <div id='1' className='content_tab_name tab-selected' onClick={handleTab1}>THÔNG TIN</div>
                    </li>
                    <li className='content_tab'>
                        <div id='2' className='content_tab_name' onClick={handleTab2}>BÀI BÁO KHOA HỌC</div>
                    </li>
                    <li className='content_tab'>
                        <div id='3' className='content_tab_name' onClick={handleTab3}>SCOPUS PROFILE</div>
                    </li>
                </ul>
            </div>
            <div className='container'>
                <div className='profile'>
                    <img className='img-avatar' src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" alt="" />
                    <div className='name-profile'>
                        Dương Nam
                    </div>
                    <div className='line'>
                        .........
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <h4 className='field-profile'>THÔNG TIN CÁ NHÂN</h4>
                        <div>
                            <div className='field-profile-info'>
                                <PortraitIcon style={{ fontSize: "20px" }} />
                                <span style={{ marginLeft: "5px" }}>Giảng viên đại học</span>
                            </div>
                            <div className='field-profile-info'>
                                <EmailIcon style={{ fontSize: "20px" }} />
                                <span style={{ marginLeft: "5px" }}>dnam@hcmus.edu.vn</span>
                            </div>
                            <div className='field-profile-info'>
                                <PhoneAndroidIcon style={{ fontSize: "20px" }} />
                                <span style={{ marginLeft: "5px" }}>038-223-334</span>
                            </div>
                            <div className='field-profile-info'>
                                <PlaceIcon style={{ fontSize: "20px" }} />
                                <span style={{ marginLeft: "5px" }}>Trường ĐH Khoa học Tự Nhiên - TPHCM</span>
                            </div>
                        </div>
                    </div>

                    <div className='line'>
                        .........
                    </div>
                    <div>
                        <h4 className='field-profile'>THÔNG TIN LIÊN QUAN</h4>
                        <div className='field-profile-info'>
                            <AttachmentIcon style={{ fontSize: "20px" }} />
                            <a style={{ marginLeft: "5px" }}>fb.com/namduonggg</a>
                        </div>
                        <div className='field-profile-info'>
                            <AttachmentIcon style={{ fontSize: "20px" }} />
                            <a style={{ marginLeft: "5px" }}>linked.in/namduong</a>
                        </div>
                    </div>

                    <div className='line'>
                        .........
                    </div>
                    <div className='edit-profile'>
                        <div style={{ marginLeft: "15px" }}>
                            <SettingsIcon style={{ fontSize: "23px" }} />
                        </div>
                        <div className="btn-edit-profile">
                            Chỉnh sửa thông tin cá nhân
                        </div>
                    </div>

                </div>
                <div>
                    {
                        currentTab === 1 ? <>
                            <div className='content-profile'>
                                <div className='main_content'>
                                    <h2 className='title_content'>BIO</h2>
                                    <p className='data_content'>
                                        Melita Grant specialises in integrated water resources management (IWRM), and water, sanitation and hygiene (WASH) in international development, with a focus on gender equality and inclusion. She has worked in governments, universities, and civil society organisations. With an academic background in Political Science and Environmental Management, Melita has expertise in water governance and policy development, and has applied this in Australian, Southeast Asian, and South Asian contexts. Melita has a technical background in applying inclusion frameworks; rural water management policy; urban water conservation and demand management technologies, behaviours and policy; transboundary water politics; and integrated water resources management through roles at the NSW Office of Water, the Office of the NSW Minister for Water, and in local government.
                                        Melita has led a number of gender equality and social inclusion projects, including the Gender Action Piece for the Global Water Partnership, and authoring a publication titled, ‘Gender Equality and Goal 6 – The Critical Connection’ for the Australian Water Partnership. She is currently leading a multi-year research project in Timor-Leste, Cambodia and Indonesia, and has led a number of research initiatives focused on rural water governance in in the Mekong Region. Melita has extensive experience in designing, implementing and evaluating stakeholder and community engagement within civil society organisations, and has synthesised and translated research into practical and actionable policy and practice recommendations for civil society and government actors.
                                        Working in the Department of Political Economy at the University of Sydney, Melita taught ‘Human Rights in International Development’ to Masters Students in 2010. She holds a Bachelor of Arts - Government (Honours first class) from Sydney University, and a Master of Environment from The University of Melbourne. Melita is the Co-Chair of the Australian WASH Reference Group, a member of the Australian Water Partnership's Expert Review Panel, and a Board Member of the Australian Network for Art & Technology (ANAT).
                                    </p>
                                </div>
                            </div>

                            <div className='content-profile'>
                                <div className='main_content'>
                                    <h2 className='title_content'>DEGREES</h2>
                                    <p className='data_content'>
                                        BA, Government (Hons 1).
                                        University of Sydney, Sydney, Australia1 Feb 1995 - 1 Nov 1999.
                                    </p>
                                </div>
                            </div>

                            <div className='content-profile'>
                                <div className='main_content'>
                                    <h2 className='title_content'>AVAILABILITY</h2>
                                    <p className='data_content'>
                                        Collaborative projects
                                        Join a web conference as a panellist or speaker
                                        Membership of an advisory committee
                                    </p>
                                </div>
                            </div>
                        </> : currentTab === 2 ? <>
                            <div className='content-profile'>
                                <span style={{ fontSize: "14px", fontStyle: "italic" }}>Chưa có bài báo khoa học nào.</span>
                            </div>
                        </> : <>
                            <div className='content-profile'>
                                <span style={{ fontSize: "14px" }}>
                                    {linkScopusProfile === '' ? (
                                        <div className="scopus-profile">
                                            <button className="btn btn-add-profile">
                                                Connect Scopus profile
                                            </button>
                                            <p>
                                                If you have more than one Scopus author profile and/or there are mistakes in your profile, please go to the&nbsp;
                                                <a href="https://www.scopus.com/feedback/author/home.uri">
                                                    Scopus Author Feedback Wizard
                                                </a>
                                                &nbsp;to request a correction
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="scopus-profile link">
                                            <h3>Link to Scopus Profile: </h3>
                                            <a href={linkScopusProfile}>
                                                {linkScopusProfile}
                                            </a>
                                        </div>
                                    )}
                                </span>
                            </div>
                        </>
                    }
                </div>

            </div>
            <div className='footer'></div>
        </Styled>
    );
}

// git rebase origin/develop
// git add
// git stash
