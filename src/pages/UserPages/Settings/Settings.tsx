import React, { SyntheticEvent, useEffect, useState } from 'react';
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
import Avatar from 'react-avatar-edit';
import { editAvatarProfile, getAllLecturers } from '../../../api/Lecturer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { toast } from 'react-toastify';

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

  const [currentTab, setCurrentTab] = useState<string>('account');
  const [openInfo, setOpenInfo] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState('');
  const [openEditAvatarModal, setOpenEditAvatarModal] = useState(false);
  const accountId: string | null = localStorage.getItem('accountId');

  const handleTab = (event: SyntheticEvent) => {
    const idChosen: string = event.currentTarget.id;
    setCurrentTab(idChosen);
    document.getElementById(idChosen)?.classList.add('tab-selected');

    const tabs = document.getElementsByClassName('content_tab_name');
    for (let i = 0; i < tabs.length; i++) {
      const tabId = tabs[i].id;
      if (tabId !== idChosen) {
        document.getElementById(tabId)?.classList.remove('tab-selected');
      }
    }
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

  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };

  const onCrop = (view: string) => {
    console.log(view);
    setAvatar(view);
    editAvatarProfile(view, accountId);
  };

  const onOk = () => {
    if (avatar !== '') {
      toast.success('Thêm ảnh thành công!')
    }
    setOpenEditAvatarModal(false);
  }

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
              <div id="account" className="content_tab_name tab-selected" onClick={handleTab}>
                Tài khoản
              </div>
            </li>
          </ul>
        </div>

        <div>
          {currentTab === 'account' ? (
            <>
              <div className="content-settings">
                <div className="main_content row">
                  <div className="avatar col-4">
                    <AvatarBtn onClick={() => setOpenEditAvatarModal(true)}>
                      {avatar === '' ? (
                        <div>
                          <CameraAltOutlinedIcon />
                          <p>Thêm ảnh</p>
                        </div>
                      ) : (
                        <div className='avatar-image' style={{
                          backgroundImage: `url(${avatar})`,
                          backgroundSize: 'cover', width: '100%', height: '100%', borderRadius: '50%'
                        }}></div>
                      )}
                    </AvatarBtn>

                    <Modal
                      title="Chỉnh sửa ảnh đại diện"
                      centered
                      open={openEditAvatarModal}
                      onOk={onOk}
                      onCancel={() => setOpenEditAvatarModal(false)}
                      width={700}
                      className="modalStyle"
                    >
                      <Avatar
                        width={400}
                        height={300}
                        onCrop={onCrop}
                      />
                    </Modal>
                  </div>

                  <div className="account-content col-8">
                    <div className="details">
                      {/* <div className="title">
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
                      </div> */}

                      <div className="details-info">
                        <div className="info">
                          <h3>Email: </h3>
                          <p>email</p>
                        </div>
                        <div className="info">
                          <h3>Mật khẩu: </h3>
                          <p>
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                            <FiberManualRecordIcon />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="account-manipulation">
                      <div className="btn-controls">
                        {/* <button className="btn btn-change-pwd">Đổi mật khẩu</button> */}
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
                            <Button type="primary" key="submit" onClick={() => setOpenDel(false)}>
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
