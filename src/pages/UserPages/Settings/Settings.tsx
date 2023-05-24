import React, { useEffect, useState } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import ModalSetting from './ModalSetting/ModalSetting';
import axios from 'axios';
import { getAllAccounts } from '../../../api/Account';

const AvatarBtn = styled('button')(({ }) => ({
  width: '155px',
  height: '155px',
  borderRadius: '50%',
  border: '2px solid #959595',
  transition: 'all .3s',
  padding: '0',

  svg: {
    width: '55px',
    height: '55px',
    color: '#959595'
  },
  p: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#959595'
  },
  '&:hover': {
    borderColor: '#323232'
  },
  '&:hover svg, &:hover p': {
    color: '#323232'
  },

  // '.avatar-image': {
  //   backgroundImage: `url('https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?pid=ImgDet&rs=1')`,
  //   backgroundSize: 'cover',
  // },
}));

interface DataType {
  id: number;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  role: number;
  token: null;
  token_expired_in: null;
}

export default function Settings() {
  const BASE_URL = 'http://localhost:8080/api/v1/';
  const token = localStorage.getItem('accessToken');

  const [currentTab, setCurrentTab] = useState(1);
  const [openInfo, setOpenInfo] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState('123');

  const handleTab1 = () => {
    setCurrentTab(1);
    document.getElementById('1')?.classList.add('tab-selected');
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    getAllAccounts().then((data) => setData(data));
    // eslint-disable-next-line no-magic-numbers, no-console
  }, []);

  const listLabel = [
    {
      label: 'Email',
      disabled: false,
      value: 'email'
    },
    {
      label: 'Mật khẩu',
      disabled: false,
      value: 'password'
    }
  ];
  const listItems = listLabel.map((item, index) => (
    <div className="info" key={index}>
      <h3>{item.label}:</h3>
      <p>{item.value}</p>
    </div>
  ));

  // const handleTab2 = () => {
  //     setCurrentTab(2);
  //     document.getElementById('2')?.classList.add('tab-selected');
  //     document.getElementById('1')?.classList.remove('tab-selected');
  //     document.getElementById('3')?.classList.remove('tab-selected');
  // };

  // const handleTab3 = () => {
  //     setCurrentTab(3);
  //     document.getElementById('3')?.classList.add('tab-selected');
  //     document.getElementById('1')?.classList.remove('tab-selected');
  //     document.getElementById('2')?.classList.remove('tab-selected');
  // };

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };

  return (
    <Styled>
      <div className="header_topbar">
        <div className="btn-back-search" onClick={handleBackSearch}>
          <ArrowBackIcon /> quay lại trang tìm kiếm{' '}
        </div>
      </div>
      <div className="container">
        <div className="settings-tab">
          <ul className="side_tab">
            <li className="content_tab">
              <AccountCircleIcon />
              <div id="1" className="content_tab_name" onClick={handleTab1}>
                Tài khoản
              </div>
            </li>
          </ul>
        </div>
        <div>
          {currentTab === 1 ? (
            <>
              <div className="content-settings">
                <div className="main_content row">
                  <div className="avatar col-4">
                    <AvatarBtn>
                      {/* <CameraAltOutlinedIcon />
                      <p>Thêm ảnh</p> */}
                      {avatar === '' ? (
                        <div>
                          <CameraAltOutlinedIcon />
                          <p>Thêm ảnh</p>
                        </div>
                      ) : (
                        <div className='avatar-image' style={{ backgroundImage: `url('https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?pid=ImgDet&rs=1')`,
                        backgroundSize: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}></div>
                      )}
                    </AvatarBtn>
                  </div>

                  <div className="account-content col-8">
                    <div className="details">
                      <div className="title">
                        <button className="btn btn-edit" onClick={() => setOpenInfo(true)}>
                          <BorderColorSharpIcon />
                          <p>Edit</p>
                        </button>
                        <Modal
                          className="title_modal"
                          title="Thông tin tài khoản"
                          centered
                          open={openInfo}
                          width={650}
                          footer={[
                            <Button key="back" onClick={() => setOpenInfo(false)}>
                              Thoát
                            </Button>,
                            <Button key="submit" onClick={() => setOpenInfo(false)}>
                              OK
                            </Button>
                          ]}>
                          <ModalSetting />
                        </Modal>
                      </div>
                      <div className="details-info">{listItems}</div>
                    </div>

                    <div className="account-manipulation">
                      <div className="btn-controls">
                        <button className="btn btn-change-pwd">Đổi mật khẩu</button>
                        <button className="btn btn-close-account" onClick={() => setOpenDel(true)}>
                          Xóa tài khoản
                        </button>

                        <Modal
                          className="title_modal"
                          title="Xóa tài khoản"
                          centered
                          open={openDel}
                          width={400}
                          footer={[
                            <Button key="submit" onClick={() => setOpenDel(false)}>
                              Có
                            </Button>,
                            <Button key="back" onClick={() => setOpenDel(false)}>
                              Không
                            </Button>
                          ]}>
                          <p>Bạn có chắc muốn xóa tài khoản không?</p>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
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
