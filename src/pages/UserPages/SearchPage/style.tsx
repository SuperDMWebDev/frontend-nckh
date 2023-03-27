import styled from 'styled-components';

const Styled = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .list_article {
    margin-top: 2rem;
  }

  .header_article {
    width: 100%;
    height: 80px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input_search {
    box-sizing: border-box;
    color: rgb(50, 50, 50);
    border: 1px solid rgb(185, 185, 185);
    background: rgb(255, 255, 255);

    height: 40px;
    width: 400px;

    font-size: 13px;

    padding: 12px 40px 12px 16px;
    line-height: 1;
    border-radius: 50px;
  }

  .btn_search {
    position: relative;

    font-size: 14px;
    height: 40px;
    width: 120px;

    margin-left: 20px;
    padding: 12px 16px;

    border: none;

    line-height: 1;
    border-radius: 50px;

    background-color: #206edb;
    color: #fff;
  }

  .sort_article {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .btn_sort {
    font-size: 16px;
    font-weight: 300;

    margin-right: 5px;
    border: none;
    border-right: 1px solid #0151c2;

    cursor: pointer;
    line-height: 1;

    background-color: #fff;

    padding: 5px 25px;
  }

  .btn_sort:last-child {
    border: none;
  }

  .btn_sort:hover {
    /* font-weight: 500; */
    color: #004fbd;
  }

  .card_article {
    box-sizing: border-box;
    width: 700px;
    height: auto;
    background: #ffffff;
    backdrop-filter: blur(6px);
    cursor: pointer;
    transition: all 0.5s;
    user-select: none;
    font-weight: bolder;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .popup_container {
    height: 100vh;
    overflow: scroll;
    padding-right: 20px;
  }

  .popup_container ::-webkit-scrollbar {
    display: none;
  }

  .popup_container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .mini {
    &_card_article {
      cursor: pointer;
      transition: all 0.5s;
      font-weight: bolder;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 20px;
    }

    &_name {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .card_article:hover {
    background-color: #e5f1f4;
  }

  .card {
    width: 900px;
    height: auto;
    background: whitesmoke;
    transition: 0.2s linear;
    box-shadow: 1px 1px 2px lightslategray;
    cursor: default;
    margin-top: 5px;
    margin-bottom: 20px;
    border-radius: 20px;
  }

  .icon_more {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
  }

  .card-top-part {
    width: 100%;
    height: 70%;
    padding: 15px;
    display: flex;
  }

  .feauture_more {
    color: red;
  }

  .left-part {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .right-part {
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .user-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .name {
    font-size: 20px;
    font-weight: 600;
  }

  .user-field {
    font-size: 15px;
    font-weight: 400;
  }

  .name:hover {
    text-decoration: underline;
  }

  .role {
    font-size: 10px;
    color: lightcyan;
    font-weight: bold;
    text-transform: lowercase;
    background-color: lightskyblue;
    padding: 4px 10px;
    border-radius: 15px;
  }

  .position {
    color: grey;
    font-size: 13px;
  }

  .card-bottom-part {
    width: 100%;
    height: 30px;
    display: flex;
    border: 1px solid rgb(231, 227, 227);
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .detail_article {
    position: fixed;

    top: 100px;
    right: -100%;

    width: 380px;
    min-height: 100vh;

    padding: 20px 0px 20px 30px;

    background: #fff;

    box-shadow: -2px 0 4px hsl(0 4% 15% / 10%);
    box-shadow: rgba(0, 0, 0, 0.12) -8px 0px 12px 0px;

    transition: 0.6s;
  }

  .detail_article_active {
    top: 100px;
    right: 0;
  }

  .nav-tabs .nav-item .nav-link {
    font-size: 16px;
    font-weight: 300;
    padding: 5px 20px;
    border: none !important;
  }

  .nav-tabs .nav-link.active {
    border: none !important;
    font-weight: 500;
    color: #0056ce !important;
    border-bottom: 2px solid #0056ce !important;
  }

  .detail_header {
    display: block;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title_detail {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
  }

  .detail_title {
    font-size: 14px;
    color: rgb(115, 115, 115);
    font-weight: bold;
    line-height: 1;
    text-transform: uppercase;
  }

  .detail_content {
    font-size: 14px;
  }

  .user-photo {
    width: 4.5rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid rgb(231, 227, 227);
    box-shadow: 2px 2px 10px lightslategray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
  }

  .bottom-part {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .bottom-part:hover > .link {
    transform: scale(1.1);
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 5.5px;
    font-weight: bold;
    transition: 0.2s linear;
  }

  .icon {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom-part:first-child {
    border-right: 1px solid rgb(231, 227, 227);
  }
`;

export default Styled;
