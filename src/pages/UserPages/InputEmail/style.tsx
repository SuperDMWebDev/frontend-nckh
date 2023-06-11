import styled from 'styled-components';
const Styled = styled.div`
  box-shadow: rgb(0 0 0 / 25%) 0 0.2rem 0.4rem 0;
  .input-email {
    &__container {
      width: 100vw;
      height: fit-content;
      position: absolute;
      left: 0px;
      top: 0px;
      background-color: var(--white);
    }
  }

  .input-email-main {
    padding: 5rem 0rem;
    width: 100%;
    height: fit-content;
    background-color: transparent;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    width: 40rem;
    margin: 0 auto;
  }

  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    box-shadow: rgb(0 0 0 / 15%) 0 0.2rem 0.4rem 0;
    padding: 1rem 4rem;
  }

  .card-container h2 {
    font-weight: bold;
    line-height: 140%;
    margin-top: 3rem;
    font-size: 2rem;
  }

  .input-box {
    align-self: flex-start;
    width: 100%;
  }

  .input-label {
    font-weight: bold;
    display: block;
    padding: 0.5rem 0rem;
    font-size: 2rem;
  }

  .input-box .input-text[type='text'],
  .input-box .input-text[type='password'] {
    width: 100%;
    min-height: 4.4rem;
    font-family: Montserrat, 'Noto Sans Arabic', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 0.1rem solid rgb(178, 178, 178);
    border-radius: 0.5rem;
    background-color: #fff !important;
    color: rgb(51, 51, 51) !important;
    font-size: 1.6rem;
    line-height: 2rem;
    letter-spacing: 0.02rem;
    outline: none;
    transition: all 1s ease-in;
    padding-left: 2rem;
    text-overflow: ellipsis;
  }

  .input-text[type='password'] {
    padding-right: 3.5rem;
    overflow: hidden;
    white-space: nowrap;
  }

  .input-text:focus {
    border: 0.2rem solid rgb(19, 104, 206) !important;
  }

  .continue-btn {
    margin: 3rem 0rem;
    margin-bottom: 1rem;
    border: none;
    width: 100%;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0rem -0.4rem inset;
    background: var(--blue-light);
    color: rgb(255, 255, 255);
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    min-width: 4.2rem;
    min-height: 4.2rem;
    padding: 0rem 1.6rem 0.4rem;
  }

  .form-input-email {
    width: 100%;
  }

  .card-text {
    position: absolute;
    padding: 0rem 0.8rem;
    background: rgb(255, 255, 255);
    font-weight: bold;
    margin-top: -0.96rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .back-control {
    width: 100%;
    height: 40px;
    width: 60%;
    margin: 0 auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-back-signin {
    cursor: pointer;
    font-family: proxima-nova, sans-serif;
    font-size: 12px;
    color: #959595;
    transition: all .3s;
  }

  .btn-back-signin:hover {
    color: black;
  }
`;

export default Styled;
