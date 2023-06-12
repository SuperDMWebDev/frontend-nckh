import styled from 'styled-components';

const Styled = styled.div`
  .container {
    width: 50%;
    height: 100%;
    padding-bottom: 40px;
    margin-bottom: 50px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }

  .header_topbar {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    overflow-anchor: none;
  }

  .btn-back-search {
    width: 300px;
    margin-right: 80px;
    margin-left: 300px;
    cursor: pointer;
    font-family: proxima-nova, sans-serif;
    font-size: 12px;
    color: #959595;
  }

  .btn-back-search:hover {
    color: #4a5bf7;
    text-decoration: underline;
  }

  .content_tab_name {
    color: #3b3b3b;
    position: relative;
    font-size: 18px;
    text-decoration: none;
    margin-top: 2px;

    border: none;
    background: none;
    font-weight: 500;
  }

  .btnContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .MuiButtonBase-root {
    font-size: 12px;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  .flex-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .selectInput {
    font-size: 15px;
    width: 170px;
    z-index: 999;
  }

  .css-13cymwt-control {
    /* height: 55px; */
  }

  .selectInputFull {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .doiInput {
    font-size: 15px;
    width: 100%;
  }

  .ant-select-selection__placeholder {
    color: blue;
  }

  .ant-input {
    font-size: 15px;
    height: 38px;
  }

  .ant-btn {
    height: 38px;
    width: 52px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .titleTag {
    font-size: 15px;
    margin-bottom: 10px;
  }

  /* .MuiInputLabel-root {
    font-size: 15px !important;
    padding-bottom: 20px !important;
  }

  .MuiInput-root {
    height: 45px !important;
  } */
`;

export default Styled;
