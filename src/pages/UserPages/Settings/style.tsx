import styled from 'styled-components';

const Styled = styled.div`
  .btn {
    font-size: 16px;
    border: 2px solid #212529;
    color: #212529;
    transition: all .3s;
    padding: 0;
  }
  .btn:active {
    border-color: transparent;
  }
  .btn:focus {
    box-shadow: none;
  }
  .title {
    margin-bottom: 16px;
    padding: 0 2px;
    text-align: right;
  }
  // 
  
  .account-content {
    margin: auto 0;
  }
  
  .header_topbar {
    margin-top: 10px;
    width: 100%;
    height: 35px;
    background-color: #f7f7f7;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
  };

  .btn-back-search {
    width: 200px;
    margin-right: 300px;
    margin-left: 50px;
    cursor: pointer;
    font-family: proxima-nova, sans-serif;
    font-size: 12px;
    color: #959595;
  }

  .btn-back-search:hover {
    text-decoration: underline;
    color: black;
  }

  .side_tab {
    list-style: none;
    padding: 0;
    margin: 30px;
    margin-left: 45px;
  }

  .content_tab {
    font-size: 20px;
    color: #f7f7f7;
    font-family: Montserrat, sans-serif;
    cursor: pointer;
    border: #959595;
    display: flex;
    align-items: center;
  }
  .content_tab svg {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }
  .content_tab:hover {
    color: white;
  }
  .content_tab:hover .content_tab_name {
    text-decoration: underline;
  }

  .container {
    display: flex;
    //max-width: 1356px;
    //margin: 0 200px 0 200px;
  }

  .settings-tab {
    background-color: #323232;
    //height: 100vh;
    border-radius: 20px;
    box-shadow: 0 0 20px hsla(0,0%,51%,.16);
    font-size: 14px;
    font-weight: 300;
    letter-spacing: .28px;
    line-height: 17px;
    padding: 0 14px 12px;
    width: 256px;
    display: flex;
    flex-direction: column;
    color: #f7f7f7;
  }

  .tab-selected {
    font-weight: bold;
  }

  .content-settings {
    background-color: #efeeee;
    width: 840px;
    height: 100vh;
    margin-left: 20px;
    border-radius: 20px;
    padding: 15px;
    height: auto;
    padding-left: 25px;
    padding-right: 25px;
    margin-bottom: 30px;
  }
  .main_content {
    text-align: left;
    padding: 30px;
  }

  .btn-edit {
    color: #959595;
    border: none;
  }
  .btn-edit:hover {
    color: #323232;
  }
  .btn-edit p {
    display: none;
  }
  
  .info {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #212529;
  }
  .info h3 {
    font-size: 16px;
    margin: 0;
    margin-right: 10px;
  }
  .details {
    margin-bottom: 16px;
  }

  .details .title::after {
    content: '';
    width: 100%;
    height: 2px;
    display: block;
    background-color: black;
    margin-top: 3px;
  }

  .account-manipulation {
    width: 60%;
    margin: 0 auto;
  }
  .btn-controls {
    display: flex;
    justify-content: space-between;
  }

  .btn-change-pwd, .btn-close-account {
    border-radius: 20px;
    padding: 5px 10px;
  }
  .btn-change-pwd:hover, .btn-close-account:hover {
    color: white;
    background-color: #323232;
  }

  .footer {
    height: 100px;
  }
`;

export default Styled;
