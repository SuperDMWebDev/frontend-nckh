import React, { SyntheticEvent, useEffect, useState } from 'react';
import Styled from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import { Button, Form, Input, Modal } from 'antd';
import { getEmailByAccountId } from '../../../api/Account';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { toast } from 'react-toastify';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Settings() {
  const [currentTab, setCurrentTab] = useState<string>('account');
  const [openInfo, setOpenInfo] = useState(false);
  const accountId: string | null = localStorage.getItem('accountId');
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (accountId !== null) {
      getEmailByAccountId(accountId).then((email) => setEmail(email));
    }
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

  const onFinish = () => {
    if (email === '') {
      toast.error('Bạn chưa nhập liên hệ!');
    } else {
      toast.success('Cập nhật email thành công!');
      setOpenInfo(false);
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
                    <AccountCircleIcon />
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
                          <p>{email}</p>
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
