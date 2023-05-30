import styled from 'styled-components';

const Styled = styled.div`
  .container {
    width: 50%;
    margin-bottom: 40px;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
    margin: 20px 0;
  }

  .header_topbar {
    width: 100%;
    height: 50px;
    background-color: #f7f7f7;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
  }

  .btn-back-search {
    width: 300px;
    margin-right: 118px;
    margin-left: 370px;
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
    color: #363636a1;
    position: relative;
    font-size: 18px;
    text-decoration: none;
    margin-top: 2px;
    margin-bottom: 2px;

    border: none;
    background: none;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
  }

  .btnContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
  }
`;

export default Styled;
