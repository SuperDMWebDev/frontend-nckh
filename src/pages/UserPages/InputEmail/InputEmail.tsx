/* eslint-disable no-negated-condition */
import React, { useState, useEffect, useContext } from 'react';
import Styled from './style';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { loginUser } from '../../../utils/api';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const InputEmail = () => {
    const [showPwd, setShowPwd] = useState(false);
    const navigate = useNavigate();
    const signInSchema = Yup.object({
        email: Yup.string().email('Not a valid email').required('Email required'),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be at least 8 characters')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signInSchema,
        onSubmit: async (value) => {
            try {
                const responseSignIn = await loginUser(value.email, value.password);
                let {
                    data: { token, message, code, expire, accountId, role, lecturerInfo }
                } = responseSignIn;
                if (code !== 0) {
                    toast.error(message);
                } else {
                    role = role.toString();
                    accountId = accountId.toString();
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('accountId', accountId);
                    localStorage.setItem('role', role);
                    if (lecturerInfo) {
                        localStorage.setItem('lecturerId', lecturerInfo.id);
                    }
                    !lecturerInfo
                        ? localStorage.setItem('scopusId', 'null')
                        : localStorage.setItem('scopusId', lecturerInfo.scopusId);
                    toast.success(message);
                    if (role === '0') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    // eslint-disable-next-line no-self-assign
                    window.location.href = window.location.href;
                }
            } catch (err) {
                console.log('err login ', err);
            }
        }
    });
    useEffect(() => {
        document.title = 'Quên mật khẩu';
    }, []);

    const handleBackSignIn = () => {
        window.location.replace('http://localhost:5000/signin');
    };

    return (
        <Styled>
            <div className="input-email__container">
                <main className="input-email-main">
                    <div className="main-container">
                        <div className="auth-form">
                            <div className="card-container">
                                <h2>Tìm tài khoản</h2>
                                <form
                                    className="form-input-email"
                                    method="post"
                                    onSubmit={formik.handleSubmit}
                                    autoComplete="on">
                                    <div className="input-box">
                                        <label htmlFor="email" className="input-label">
                                            Nhập Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="Nhập email"
                                            className="input-text"
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                            <p className="error-message">{formik.errors.email}</p>
                                        )}
                                    </div>
                                    <button type="submit" className="continue-btn">
                                        Tiếp tục
                                    </button>
                                    <div className="back-control">
                                        <div className="btn-back-signin" onClick={handleBackSignIn}>
                                        <ArrowBackIosRoundedIcon /> Quay lại trang đăng nhập{' '}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Styled>
    );
};

export default InputEmail;
