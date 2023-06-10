import styled from 'styled-components';

const Styled = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
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
    background-color: #fff;
    border: none;
  }

  .header_article input {
    border: 1px solid var(--gray);
    border-right: none;
  }

  .header_article .searchOption {
    height: 40px;
    border: 1px solid var(--gray);
  }

  .searchOption_option_item:hover {
    cursor: pointer;
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

  .icon_more {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-top-part {
    width: 100%;
    height: 70%;
    padding: 15px;
    display: flex;
  }

  .left-part {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .right-part {
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    font-weight: 300;

    &_group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
    }

    &__num {
      display: inline-block;
      font-size: 18px;
      margin: auto;
    }

    &__title {
      font-size: 13px;
      margin-right: auto;
    }
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
    font-style: italic;
    margin: 5px 0;
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    padding: 15px;
    border: none;

    &__group {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #206edb;
    }

    &__item {
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
    }

    &__item:hover {
      text-decoration: underline;
      color: #0145a4;
    }
  }

  .detail_article {
    position: fixed;

    top: 100px;
    right: -100%;

    border-radius: 10px;

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

    &_card_article:hover {
      background-color: rgb(225, 238, 255);
    }

    &_name {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .card_article:hover {
    background-color: rgb(225, 238, 255);
  }
  img {
    width: 100%;
  }

  .search-radio {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: -20px;
    width: 380px;
    margin-left: -130px;
  }
  .search-radio p {
    margin-bottom: 0;
    margin-right: 50px;
  }
  .search-form-check {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-check-input {
    cursor: pointer;
  }
  .form-check-input:hover,
  .form-check-input:focus,
  .form-check-input:checked {
    box-shadow: 0 0 0 0.125rem rgba(13, 110, 253, 0.25);
  }
  .header_article input::placeholder {
    font-style: italic;
  }

  .btn-back-search {
    position: absolute;
    left: 50px;
    top: 18px;
    cursor: pointer;
    font-family: proxima-nova, sans-serif;
    font-size: 12px;
    color: #959595;
  }

  .btn-back-search:hover {
    text-decoration: underline;
    color: black;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    max-width: 700px;
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
  }

  .left {
    &_img {
      width: 113px;
      border-radius: 50%;
    }
  }

  .right {
    &_availability {
      display: flex;
      font-size: 13px;
      gap: 15px;
      margin-top: 8px;
      &_title {
        font-weight: 600;
      }

      &_content {
        color: grey;
      }
    }

    &_category {
      border-radius: 15px;
      display: inline-flex;
      font-size: 11px;
      letter-spacing: 0.13px;
      line-height: 16px;
      padding: 5px 10px;
      margin-top: 15px;
      background-color: #dadada;
    }
  }

  .searchContainer {
    max-width: 656px;
    height: 80px;
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  .input_search {
    box-sizing: border-box;
    color: rgb(50, 50, 50);
    background: rgb(255, 255, 255);
    border: none;
    height: 60px;
    width: 500px;
    font-size: 16px;
    padding: 12px 40px 12px 40px;
    line-height: 1;
    border-radius: 50px 0 0 50px;
    font-family: proxima-nova, sans-serif;
  }

  .searchOption {
    background-color: #fff;
    border-radius: 0 50px 50px 0;
    padding: 0 20px;
    position: relative;
    font-family: proxima-nova, sans-serif;
    font-size: 14px;
    color: rgb(50, 50, 50);

    &_title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80px;
      height: 60px;
      font-size: 16px;
      cursor: pointer;
    }

    &_option {
      position: absolute;
      top: 80px;
      right: 10px;
      color: black;

      width: 140px;
      height: 90px;

      border-radius: 9px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.196);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      overflow: hidden;
      background-color: #fff;
      z-index: 999;

      &_item {
        width: 100%;
        padding: 8px 0px;
        text-align: center;
        font-size: 16px;
      }

      &_item:hover {
        background-color: #e8e8e8;
      }
    }
  }
`;

export default Styled;
