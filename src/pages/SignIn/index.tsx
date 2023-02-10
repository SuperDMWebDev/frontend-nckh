import React, { useState, useEffect, useContext } from 'react';
import Styled from './style';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../utils/api';
import { toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const SignIn = function () {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  // const responseGoogle = async (response) => {
  //   const res = await loginUserWithGoogle(response.tokenId);
  //   const { data, status } = res;
  //   if (status != 200) {
  //     toast.error(data, {
  //       position: 'top-right',
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       theme: 'light'
  //     });
  //   } else {
  //     const { accessToken, refreshToken, msg } = data;
  //     localStorage.setItem('accessToken', accessToken);
  //     localStorage.setItem('refreshToken', refreshToken);
  //     toast.success(msg, {
  //       position: 'top-right',
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       theme: 'light'
  //     });
  //     let cuser = await isAuthenticated();
  //     if (cuser?.user != undefined) {
  //       setCurrentUser(cuser.user);
  //     }
  //     navigate('/home');
  //   }
  // };
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
      // console.log("value submit ", value);
      try {
        const responseSignIn = await loginUser(value.email, value.password);
        const { data, status } = responseSignIn;

        if (status != 200) {
          toast.error(data, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'light'
          });
        } else {
          const { accessToken, refreshToken, msg } = data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          toast.success(msg, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'light'
          });
          // let cuser = await isAuthenticated();
          // // console.log("cuser ", cuser);
          // if (cuser?.user != undefined) {
          //   setCurrentUser(cuser.user);
          // }
          navigate('/home');
        }
      } catch (err) {
        throw err;
      }
    }
  });
  const onSuccess = (res: any) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res);
  };
  // const { signInWithGoogle } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   GOOGLE_CLIENT_ID,
  //   isSignedIn: true,
  //   accessType: 'offline'
  //   // responseType: 'code',
  //   // prompt: 'consent',
  // });
  useEffect(() => {
    document.title = 'HCMUS - Sign in';
    // document.getElementById("root").style.backgroundImage = `url("./assets/images/universe.jpg")`;
    // document.getElementById("root").style.backgroundSize = `cover`;
    // document.getElementById("root").style.backgroundRepeat = `no-repeat`;

    return () => {
      document.body.style.backgroundImage = 'url';
    };
  }, []);
  return (
    <Styled>
      <div className="signin-container">
        <main className="signin-main">
          <div className="main-container">
            <div className="auth-form">
              <div className="card-container">
                <h2>Log in</h2>
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
                      placeholder="Input email"
                      className="input-text"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="error-message">{formik.errors.email}</p>
                    )}
                  </div>
                  <div className="input-box">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <div className="pwd-container">
                      <input
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={showPwd ? 'text' : 'password'}
                        placeholder="Input password"
                        className="input-text"
                      />
                      <div className="pwd-action" onClick={() => setShowPwd(!showPwd)}>
                        <div className="pwd-img">
                          {showPwd == false ? (
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
                    Forgot password?
                    <Link to="/forgot-password" className="reset-link">
                      Reset your password
                    </Link>
                  </div>
                  <button type="submit" className="login-btn">
                    Log in
                  </button>
                </form>
                <div className="auth-split">
                  <hr className="card-line" />
                  <span className="card-text">or</span>
                </div>
                <div className="single-sign-on">
                  {/* <GoogleLoginButton responseGoogle={responseGoogle} /> */}
                </div>
                <p className="redirect-signup">
                  Don't have an account?
                  <a href="/signup">Sign up</a>
                </p>

                <p className="text-disclaimer">
                  By signing up, you accept our Terms and Conditions. Please read our Privacy Policy
                  and Children’s Privacy Policy.
                </p>
                <p className="text-disclaimer">
                  I understand that I can withdraw my consent at any time and the withdrawal will
                  not affect the lawfulness of the consent before its withdrawal, as described in
                  the Kahoot! Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Styled>
  );
};

export default SignIn;
