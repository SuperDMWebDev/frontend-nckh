/* eslint-disable no-negated-condition */
import React, { useState, useEffect, useContext } from 'react';
import Styled from './style';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../utils/api';
import { toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Footer from '../../components/Footer';
const SignIn = () => {
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
    document.title = 'HCMUS - Đăng nhập';
  }, []);

  return (
    <Styled>
      <div className="signin__container">
        <nav className="signin__header">
          <div className="nav__container container">
            <nav className="nav__left">
              <span>
                <i className="fa fa-phone"></i>
                <a href="tel:(028) 3835 4266">Điện thoại: (028) 3835 4266</a>
              </span>
              <span>
                <i className="fa-regular fa-envelope"></i>{' '}
                <a href="mailto:info@fit.hcmus.edu.vn">info@fit.hcmus.edu.vn</a>
              </span>
            </nav>
            <div className="nav__right">
              <span>Bạn chưa đăng nhập</span>
            </div>
          </div>
        </nav>
        <div className="signin__logo">
          <div className="container">
            <nav className="navbar">
              <a href="#" className="navbar__logo">
                <span className="logo">
                  <img className="navbar__image" src="/assets/images/logo_hcmus.jpg" alt="logo" />
                </span>
              </a>
            </nav>
          </div>
        </div>
        <main className="signin-main">
          <div className="main-container">
            <div className="auth-form">
              <div className="card-container">
                <h2>Đăng nhập</h2>
                <form
                  className="form-login"
                  method="post"
                  onSubmit={formik.handleSubmit}
                  autoComplete="on">
                  <div className="input-box">
                    <label htmlFor="email" className="input-label">
                      Email
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
                  <div className="input-box">
                    <label htmlFor="password" className="input-label">
                      Mật khẩu
                    </label>
                    <div className="pwd-container">
                      <input
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={showPwd ? 'text' : 'password'}
                        placeholder="Nhập password"
                        className="input-text"
                      />
                      <div className="pwd-action" onClick={() => setShowPwd(!showPwd)}>
                        <div className="pwd-img">
                          {showPwd === false ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </div>
                      </div>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <p className="error-message">{formik.errors.password}</p>
                    )}
                  </div>
                  <div className="forgot-password">
                    Quên mật khẩu?
                    <Link to="/input-email" className="reset-link">
                      Đặt lại mật khẩu
                    </Link>
                  </div>
                  <button type="submit" className="login-btn">
                    Đăng nhập
                  </button>
                </form>
                <hr className="card-line" />

                <p className="text-disclaimer">
                  {/* By signing up, you accept our Terms and Conditions. Please read our Privacy Policy
                  and Children’s Privacy Policy. */}
                  Bằng cách Đăng ký, bạn chấp nhận Điều khoản và Điều kiện của chúng tôi. Vui lòng đọc Chính sách quyền riêng tư và Quyền riêng tư của trẻ em.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </Styled>
  );
};

export default SignIn;
