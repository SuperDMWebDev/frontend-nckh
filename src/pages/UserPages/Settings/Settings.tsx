import React, { SyntheticEvent, useEffect, useState } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import styled from 'styled-components';
import { Button, Form, Input, Modal } from 'antd';
import { getEmailByAccountId } from '../../../api/Account';
import Avatar from 'react-avatar-edit';
import { editAvatarProfile, getInfoProfile } from '../../../api/Lecturer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { toast } from 'react-toastify';

type SizeType = Parameters<typeof Form>[0]['size'];

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

type Lecturer = {
  [key: string]: any; // 👈️ variable key
  name: string;
};

export default function Settings() {
  const [currentTab, setCurrentTab] = useState<string>('account');
  const [openInfo, setOpenInfo] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [openEditAvatarModal, setOpenEditAvatarModal] = useState(false);
  const accountId: string | null = localStorage.getItem('accountId');
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
  const [email, setEmail] = useState<string>('');
  const [lecturer, setLecturer] = useState<Lecturer>();

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    getEmailByAccountId().then((email) => setEmail(email));
    // eslint-disable-next-line no-magic-numbers, no-console
  }, []);

  useEffect(() => {
    const data: Promise<Lecturer> = getInfoProfile(accountId);
    data
      .then((result) => {
        setLecturer(result);
        setAvatar(result.avatar);
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
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
  const handleBackSearch = () => {
    window.location.replace('http://localhost:5000/');
  };
  const handleCancel = () => {
    setOpenInfo(false);
  };

  const onCrop = (view: string) => {
    setAvatar(view);
    editAvatarProfile(lecturer, view, accountId);
  };

  const onOk = () => {
    if (avatar !== '') {
      toast.success('Thêm ảnh thành công!')
    }
    setOpenEditAvatarModal(false);
  }
  const onFinish = () => {
    if (email === '') {
      toast.error('Bạn chưa nhập liên hệ!');
    } else {

    }
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
                          footer={[]}>
                          <Form
                            form={form}
                            className='modalAccount'
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            onFinish={() => onFinish()}
                            initialValues={{ size: 'large' }}
                            onValuesChange={onFormLayoutChange}
                            size={componentSize as SizeType}
                            style={{ maxWidth: 550 }}
                          >
                            <Form.Item label="email">
                              <Input defaultValue={email}
                              />
                              <Input placeholder="Liên hệ" value={email} onChange={handleInputChange} />
                            </Form.Item>

                            <Form.Item className='btn-controls' wrapperCol={{ offset: 8, span: 16 }}>
                              <Button className='btn-cancel' key="back" onClick={handleCancel}>
                                Thoát
                              </Button>
                              <Button type="primary" htmlType="submit">
                                OK
                              </Button>
                            </Form.Item>
                          </Form>
                        </Modal>
                      </div>

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
