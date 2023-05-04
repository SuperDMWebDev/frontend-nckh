import styled from 'styled-components';

const Styled = styled.div`
  .header_topbar {
    margin-top: 10px;
    width: 100%;
    height: 35px;
    background-color: #f7f7f7;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
  }

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

  .header_tab {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: space-between;
  }

  .content_tab {
    margin-left: 50px;
    font-size: 16px;
    cursor: pointer;
    border: #959595;
  }

  .content_tab:hover {
    color: #3f51b5;
  }

  .content_tab:hover::after {
    width: 100%;
  }

  .content_tab_name {
    color: #959595;
    position: relative;
    font-size: 14px;
    text-decoration: none;
    font-family: Montserrat, sans-serif;
  }

  .content_tab_name:hover {
    color: black;
  }

  .content_tab_name::after {
    content: '';
    background-color: black;
    width: 0;
    display: block;
    height: 2px;
    position: absolute;
    transition: all 0.3s;
  }

  .container {
    display: flex;
    max-width: 1356px;
    margin: 0 200px 0 200px;
  }

  .profile {
    background-color: #323232;
    //height: 100vh;
    border-radius: 20px;
    box-shadow: 0 0 20px hsla(0, 0%, 51%, 0.16);
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.28px;
    line-height: 17px;
    padding: 0 14px 12px;
    width: 256px;
    display: flex;
    flex-direction: column;
    color: #f7f7f7;
  }

  .tab-selected {
    font-weight: bold;
    color: black;
  }

  .add-article-btn {
    background-color: transparent;
    border: 1px solid #000;
    color: #000;
    width: 840px;
    height: 70vh;
    padding: 15px;
    margin-left: 20px;
    border-radius: 20px;
    height: auto;
    margin-bottom: 30px;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 14px;
  }

  .content-profile {
    background-color: #efeeee;
    width: 840px;
    height: 100vh;
    margin-left: 20px;
    border-radius: 20px;
    padding: 15px;
    height: auto;
    text-align: center;
    padding-left: 25px;
    padding-right: 25px;
    margin-bottom: 30px;
  }

  .img-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 30px;
  }

  .name-profile {
    font-family: proxima-nova, sans-serif;
    font-size: 23px;
    line-height: 26px;
    color: #ffffff;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 10px;
  }

  .line {
    /* background-image: linear-gradient(90deg,hsla(0,0%,100%,.55) 1px,transparent 0);
    background-repeat: repeat-x;
    background-size: 6px 1px; */
    flex: none;
    height: 0.1px;
    font-weight: 400;
    color: white;
    letter-spacing: 15px;
    font-size: 7px;
    justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .field-profile {
    margin-top: 30px;
    height: 45px;
    width: auto;
    padding: 10px;
    border: 2px solid white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .field-profile-info {
    font-size: 14px;
    margin-bottom: 7px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
  }

  .field-profile-info a:hover {
    text-decoration: underline;
  }

  .title_content {
    font-size: 15px;
    font-weight: bold;
    line-height: 24px;
  }
  .main_content {
    text-align: left;
  }

  .data_content {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.3px;
    text-align: left;
    white-space: pre-wrap;
    font-weight: 350;
  }

  .edit-profile {
    margin: 0 auto;
    margin-top: 65px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #474747;
    border-radius: 20px;
    height: 60px;
    width: auto;
    cursor: pointer;
  }

  .edit-profile:hover {
    background-color: #666666;
  }

  .btn-edit-profile {
    padding: 0.9rem 1.8rem;
    font-size: 16px;
    color: white;
    position: relative;
    background-color: transparent;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
  }

  .btn-add-profile {
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    border: 2px solid #323232;
    border-radius: 20px;
    height: 45px;
    width: auto;
    margin-bottom: 10px;
  }
  .btn-add-profile:hover {
    background-color: #323232;
    color: white;
  }
  .scopus-profile a {
    color: #212529;
    text-decoration: none;
  }
  .scopus-profile a:hover {
    text-decoration: underline;
  }
  .scopus-profile.link {
    display: flex;
    align-items: center;
  }
  .scopus-profile.link h3 {
    margin: 0;
    margin-right: 10px;
  }

  .footer {
    height: 100px;
  }
`;

export default Styled;
