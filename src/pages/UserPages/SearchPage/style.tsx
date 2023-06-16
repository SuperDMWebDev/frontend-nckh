import styled from 'styled-components';

const Styled = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .disabled {
    /* Apply the desired styles for the disabled button */
    opacity: 0.5; /* Example: Reducing opacity */
    pointer-events: none; /* Example: Disable pointer events */
    /* Add any other styles you want */
  }

  .searchPage__title {
    margin: 20px 0px;
    font-size: 22px;
    font-family: monospace;
  }

  .searchContainer {
    max-width: 656px;
    height: 60px;
    margin-top: auto;
    margin-bottom: auto;
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
    padding: 12px 40px 12px 60px;
    line-height: 1;
    border-radius: 50px 0 0 50px;
    font-family: proxima-nova, sans-serif;
  }

  .input_search:focus {
    outline: none;
  }

  .searchText {
    position: relative;
    height: 60px;
    border-right: #ddd 1px solid;
  }

  .searchIcon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .clearIcon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .clearIcon svg {
    color: #999;
  }

  .clearIcon:hover svg {
    color: #555;
  }

  .list_article {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
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

  .layout_main {
    display: flex;
    margin: 0 auto;
    max-width: 1356px;
    padding: 0 20px;
    width: 100%;
    margin-bottom: 70px;
    margin-top: 40px;
  }

  .result__left {
    display: flex;
    flex-direction: column;
    flex: none;
    align-items: center;
    width: 300px;
    z-index: 1;

    .sideBar__heading {
      color: #111;
      font-size: 31px;
      font-weight: 600;
      letter-spacing: .9px;
      line-height: 1;
    }

    .university-icon {
      font-weight: 300;
    }

    .sideBar__subHeading {
      font-size: monospace;
      color: #111;
      font-size: 23px;
      font-weight: 600;
      letter-spacing: .3px;
      line-height: 1.2;
      margin-bottom: 20px;
      text-align: center;
      margin-top: 5px;

      i {
        margin-right: 5px;
      }
    }
    .sideBar__optionsHead {
      margin-bottom: 15px;
      align-items: baseline;
      color: #505050;
      display: flex;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: .1px;
      line-height: 1;
      padding: 10px 5px;
      justify-content: space-between;
      width: 100%;

      button {
        -webkit-font-smoothing: inherit;
      background: none;
      border: 0;
      cursor: pointer;
      font: inherit;
      letter-spacing: inherit;
      overflow: visible;
        color: #505050;
        font-family: barlow-condensed,serif;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 1;
      }
    }

    .sideBar_item_container {

      .sideBar_item {
        align-items: center;
        border-radius: 3px;
        color: #505050;
        display: flex;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 1.2;
        padding-bottom: 8px;
        padding-left: 10px;
        padding-top: 8px;
        width: 345px;
        align-items: center;
        display: flex;
        flex: auto;

        input {
          margin-right: 5px;
        }

      }

      .show-button {
        background-color: #ffffff;
        border: 1px solid #cccccc;
        color: #333333;
        padding: 8px 16px;
        cursor: pointer;
      }

      .show-button:hover {
        background-color: #f5f5f5;
      }

      .show-button:focus {
        outline: none;
      }

      .show-button.show-less {
        background-color: #ffffff;
        border: 1px solid #cccccc;
        color: #333333;
        padding: 8px 16px;
        cursor: pointer;
      }
    }


  }


    .result__buffer {
      flex: 0 2 90px;
      min-width: 45px;
      z-index: 0;
    }

    .result__pagination {
      width: 700px;
      margin: 0 auto;
      padding-bottom: 20px;
      padding: 11px 13px 0;
      flex: 0 1 926px;
    }

    .sort_container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      margin-top: 50px;
      margin-bottom: 30px;
      width: 100%;
    }

  .dropdown_discovery {
      align-items: center;
      background-color: #f7f7f7;
      border-radius: 6px;
      display: inline-flex;
      padding: 3px 8px 4px 10px;
      white-space: nowrap;
      padding: 10px;

      label {
        color: #111;
      font-family: proxima-nova,sans-serif;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: .28px;
      line-height: 17px;
      margin-bottom: 0px;
      }

      select {
        color: #111;
        font-family: proxima-nova,sans-serif;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: .28px;
        line-height: 17px;
        appearance: none;
        border: 0;
        padding: 0 18px 0 5px;
        background-color: #f7f7f7;
      }

      select > option {
        font-weight: 400;
      }

      .select-container {
        position: relative;
        display: inline-block;
      }

      .custom-select {
        appearance: none;
        position: relative;
        z-index: 1;
      }

      .dropdown-icon {
        position: absolute;
        top: 50%;
        right: 0px;
        transform: translateY(-50%);
        pointer-events: none;
      }
  }

  .dropdown_discovery select:focus {
    outline: none; /* Remove focus outline */
    box-shadow: 0 0 3px 1px rgba(0, 123, 255, 0.5); /* Add box shadow on focus */
  }

  .pagination_bar_left {
    flex: 1;
  }
  .pagination_bar_middle {
    flex: 0;
    padding: 0 10px;

    .pagination_button__container {
      display: flex;
      marginBottom: '50px',
      marginTop: '30px'
    }
  }
  .pagination_bar_right {
    flex: 1;
    text-align: right;
    font-size: 15px;
    font-family: monospace;
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
    /*
    padding-top: 20px;
    padding-bottom: 20px; */
  }

  .icon_more {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
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

  .btn-pre-next {
    font-family: monospace;
    background-color: #f3f7fe;
    color: #3f51b5;
    border: none;
    border-radius: 8px;
    width: 35px;
    height: 35px;
    border: 1px solid #3f51b5;
    transition: 0.3s;
    font-size: 13px;
  }
  .btn-left {
    margin-right: 5px;
  }
  .btn-right {
    margin-left: 5px;
  }

  .btn-pre-next:hover {
    background-color: #3f51b5;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }

  .btn-pagination {
    height: 35px;
    width: 35px;
    font-family: monospace;
    background-color: #f3f7fe;
    color: #3f51b5;
    border: none;
    border-radius: 8px;
    border: 1px solid #3f51b5;
    transition: 0.3s;
    font-size: 13px;
    margin: 0 5px;
  }

  .btn-pagination:hover {
    background-color: #3f51b5;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }

  .active {
    background-color: #3f51b5;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }
  .footer {
    background-color: #f5f5f5;
    padding: 20px 0;
    text-align: center;
  }

  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    width: 300px; /* Adjust the width as needed */
    height: auto;
  }

  .info {
    margin: 5px 0;
    font-size: 14px;
  }
`;

export default Styled;
