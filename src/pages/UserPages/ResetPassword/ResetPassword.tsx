import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Styled from './style';
import { toast } from 'react-toastify';
import { resetPassword } from '../../../api/Account';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({}); // State variable to track form validation errors
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required.')
      .min(8, 'Password is too short - should be at least 8 characters')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
    confirmPassword: Yup.string()
      .required('Confirm password is required.')
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match.')
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validate the form fields
    try {
      await schema.validate({ newPassword, confirmPassword }, { abortEarly: false });
    } catch (error) {
      const validationErrors: any = {};
      error.inner.forEach((err: any) => {
        validationErrors[err.path] = err.message;
      });

      setErrors(validationErrors);

      return;
    }

    if (newPassword === confirmPassword) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token && newPassword) {
        const res = await resetPassword(token, newPassword);
        console.log('🚀 ~ file: ResetPassword.tsx:23 ~ handleSubmit ~ res:', res);
        if (res.code === 0) {
          toast.success(res.message);
          navigate('/signin');
        } else {
          toast.error(res.message);
        }
      } else {
        toast.error('Check your token and password');
      }
    } else {
      toast.error('Passwords do not match!');
    }

    // Reset the form fields
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Styled>
      <div className="reset-password-form">
        <h1>Password Reset</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">New Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              name="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
            <span className="password-toggle" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.newPassword && <span className="error">{errors.newPassword}</span>}

          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <span className="password-toggle" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          {errors.general && <span className="error">{errors.general}</span>}

          <input type="submit" value="Reset Password" />
        </form>
      </div>
    </Styled>
  );
}
