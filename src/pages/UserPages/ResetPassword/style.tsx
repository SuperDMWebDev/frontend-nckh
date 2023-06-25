/* CSS for the ResetPasswordForm component */
import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  height: calc(100vh - 80px);
  width: 100%;
  font-size: 16px;
  .reset-password-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  .reset-password-form h1 {
    text-align: center;
    color: #333;
  }

  .reset-password-form label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
  }

  .password-input {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
    color: #999;
  }

  .password-toggle svg {
    font-size: 16px;
  }

  label {
    margin-top: 15px;
  }

  .reset-password-form input[type='password'],
  .reset-password-form input[type='text'] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-right: 30px; /* Adjust the padding to make space for the icon */
    color: #333;
  }

  .reset-password-form input[type='submit'] {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }

  .reset-password-form input[type='submit']:hover {
    background-color: #45a049;
  }
`;

export default Styled;
