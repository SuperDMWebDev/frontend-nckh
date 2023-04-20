import React, { useState } from 'react';
import Styled from './style';
import styled from 'styled-components';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import { Button, Modal } from 'antd';
import ModalAccount from './ModalAccount';
import { deleteAccount } from '../../../../utils/AccountAPI/api';

const AvatarBtn = styled('button')(({ }) => ({
    width: '155px',
    height: '155px',
    borderRadius: '50%',
    backgroundColor: 'var(--gray-light)',
    border: 'none',
    transition: 'all .3s',

    svg: {
        width: '55px',
        height: '55px',
        color: 'var(--gray-medium)'
    },
    p: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: 'var(--gray-dark)'
    },
    '&:hover': {
        backgroundColor: 'var(--gray-semi)'
    },
    '&:hover svg, &:hover p': {
        color: 'var(--white)'
    }
}));

const listLabel = [
    {
        label: 'Email',
        disabled: false,
        value: 'email'
    },
    {
        label: 'Password',
        disabled: false,
        value: 'password'
    }
];
const listItems = listLabel.map((item, index) =>
    <div className="info" key={index}>
        <h1>{item.label}:</h1>
        <p>{item.value}</p>
    </div>
);

const AccountPage: React.FC = () => {
    const [openInfo, setOpenInfo] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    return (
        <Styled>
            <section className="account container row">
                <div className="avatar col-4">
                    <AvatarBtn>
                        <CameraAltOutlinedIcon />
                        <p>Add photo</p>
                    </AvatarBtn>
                </div>

                <div className="account-content col-8">
                    <div className="details">
                        <div className="title">
                            {/* <h3>Personal information</h3> */}
                            <button className="btn btn-edit" onClick={() => setOpenInfo(true)}>
                                <BorderColorSharpIcon />
                                <p>Edit</p>
                            </button>
                            <Modal
                                className='title_modal'
                                title="Personal Information"
                                centered
                                open={openInfo}
                                onOk={() => setOpenInfo(false)}
                                onCancel={() => setOpenInfo(false)}
                                width={650}
                            >
                                <ModalAccount />
                            </Modal>
                        </div>
                        <div className="details-info">
                            {listItems}
                        </div>
                    </div>

                    {/* <div className="download-data container">
                    <div className="title">
                        <div className="title-top">
                            <h3>Download your profile data</h3>
                        </div>
                    </div>
                    <div className="download-data-content">
                        <p>Choose file format that you want to download:</p>
                        <div className="btn-controls">
                            <button className="btn btn-file">JSON</button>
                            <button className="btn btn-file">TXT</button>
                        </div>
                    </div>
                </div> */}

                    <div className="account-manipulation container">
                        <div className="btn-controls">
                            <button className="btn btn-change-pwd">Change your password</button>
                            <button className="btn btn-close-account" onClick={() => setOpenDel(true)}>Close your account</button>

                            <Modal
                                className='title_modal'
                                title="Delete Account"
                                centered
                                open={openDel}
                                onOk={() => setOpenDel(false)}
                                onCancel={() => setOpenDel(false)}
                                width={400}
                                footer={[
                                    <Button key="submit" onClick={() => deleteAccount()}>
                                        Yes
                                    </Button>,
                                    <Button key="back" onClick={() => setOpenDel(false)}>
                                        No
                                    </Button>,
                                ]}
                            >
                                <p>Do you want to delete your account?</p>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </Styled>
    );
};

export default AccountPage;
