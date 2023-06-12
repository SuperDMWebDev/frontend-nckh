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

  .btn-pre-next {
    font-family: monospace;
    background-color: #f3f7fe;
    color: #3b82f6;
    border: none;
    border-radius: 8px;
    width: 80px;
    height: 35px;
    border: 1px solid #3b82f6;
    transition: 0.3s;
    font-size: 13px;
    margin-right: 5px;
  }

  .btn-pre-next:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }

  .btn-pagination {
    height: 35px;
    width: 35px;
    font-family: monospace;
    background-color: #f3f7fe;
    color: #3b82f6;
    border: none;
    border-radius: 8px;
    border: 1px solid #3b82f6;
    transition: 0.3s;
    font-size: 13px;
    margin-right: 5px;
  }

  .btn-pagination:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }

  .card_article:hover {
    background-color: #e5f1f4;
  }

  .add-article-container {
    display: flex;
    justify-content: center;
    padding: 15px;
  }

  .btn-add-article-2 {
    padding: 7px 15px;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid #3f51b5;
    border-radius: 20px;
    height: 40px;
    width: auto;
    margin-bottom: 10px;
    color: #3f51b5;
  }
  .btn-add-article-2:hover {
    background-color: #3f51b5;
    color: white;
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

  .active {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
    border: none;
  }
`;

export default Styled;
